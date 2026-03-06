-- ============================================================
-- OrderHub — Supabase PostgreSQL Schema Migration
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Enable UUID extension (usually pre-enabled in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ──────────────────────────────────────────────────────────
-- 1. Items Table
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS items (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_code       VARCHAR(50) NOT NULL,
    name_en         VARCHAR(200) NOT NULL,
    name_ar         VARCHAR(200) NOT NULL,
    image_path      VARCHAR(500),
    category        VARCHAR(100) DEFAULT '',
    price           DECIMAL(18,2) NOT NULL DEFAULT 0 CHECK (price >= 0),
    vat_percentage  DECIMAL(5,2) NOT NULL DEFAULT 0 CHECK (vat_percentage IN (0, 15)),
    net_total       DECIMAL(18,2) GENERATED ALWAYS AS (price + (price * vat_percentage / 100)) STORED,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ,
    is_deleted      BOOLEAN NOT NULL DEFAULT FALSE
);

-- Unique index on item_code (only for non-deleted items)
CREATE UNIQUE INDEX idx_items_item_code ON items (item_code) WHERE is_deleted = FALSE;

-- Index for common queries
CREATE INDEX idx_items_created_at ON items (created_at DESC) WHERE is_deleted = FALSE;
CREATE INDEX idx_items_category ON items (category) WHERE is_deleted = FALSE;

-- ──────────────────────────────────────────────────────────
-- 2. App Configuration Table (simplified for Supabase)
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS app_configurations (
    id                  INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    seed_data_enabled   BOOLEAN NOT NULL DEFAULT FALSE,
    seed_data_count     INT NOT NULL DEFAULT 100,
    seed_data_category  TEXT NOT NULL DEFAULT 'All',
    updated_at          TIMESTAMPTZ
);

-- Insert singleton config row
INSERT INTO app_configurations (id, seed_data_enabled, seed_data_count, seed_data_category)
VALUES (1, FALSE, 100, 'All')
ON CONFLICT (id) DO NOTHING;

-- ──────────────────────────────────────────────────────────
-- 3. Auto-update updated_at trigger
-- ──────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER items_updated_at
    BEFORE UPDATE ON items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER app_configurations_updated_at
    BEFORE UPDATE ON app_configurations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ──────────────────────────────────────────────────────────
-- 4. PostgreSQL function: paginated items search
--    (replaces the .NET ItemService.GetItemsAsync)
-- ──────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION get_items_paged(
    p_page INT DEFAULT 1,
    p_size INT DEFAULT 10,
    p_search TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    v_offset INT;
    v_total INT;
    v_items JSON;
BEGIN
    v_offset := (p_page - 1) * p_size;

    -- Count total matching rows
    SELECT COUNT(*) INTO v_total
    FROM items
    WHERE is_deleted = FALSE
      AND (
          p_search IS NULL
          OR p_search = ''
          OR LOWER(item_code) LIKE '%' || LOWER(p_search) || '%'
          OR LOWER(name_en) LIKE '%' || LOWER(p_search) || '%'
          OR name_ar LIKE '%' || p_search || '%'
      );

    -- Fetch paginated results
    SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json) INTO v_items
    FROM (
        SELECT
            id,
            item_code,
            name_en,
            name_ar,
            image_path,
            category,
            price,
            vat_percentage,
            net_total,
            created_at,
            updated_at
        FROM items
        WHERE is_deleted = FALSE
          AND (
              p_search IS NULL
              OR p_search = ''
              OR LOWER(item_code) LIKE '%' || LOWER(p_search) || '%'
              OR LOWER(name_en) LIKE '%' || LOWER(p_search) || '%'
              OR name_ar LIKE '%' || p_search || '%'
          )
        ORDER BY created_at DESC
        LIMIT p_size
        OFFSET v_offset
    ) t;

    RETURN json_build_object(
        'items', v_items,
        'totalCount', v_total,
        'page', p_page,
        'size', p_size
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
