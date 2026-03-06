-- ============================================================
-- OrderHub — Row Level Security + Storage Bucket
-- Run AFTER 002_seed_data.sql in Supabase SQL Editor
-- ============================================================

-- ── Enable RLS on both tables ──
ALTER TABLE items ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_configurations ENABLE ROW LEVEL SECURITY;

-- ── Items policies: public read, anon insert/update/delete ──
CREATE POLICY "items_select_all"
  ON items FOR SELECT
  USING (true);

CREATE POLICY "items_insert_anon"
  ON items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "items_update_anon"
  ON items FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "items_delete_anon"
  ON items FOR DELETE
  USING (true);

-- ── App configuration policies ──
CREATE POLICY "config_select_all"
  ON app_configurations FOR SELECT
  USING (true);

CREATE POLICY "config_update_anon"
  ON app_configurations FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- ── Storage bucket for product images ──
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('product-images', 'product-images', true, 5242880)  -- 5 MB
ON CONFLICT (id) DO NOTHING;

-- Storage policies: public read, anon upload/update/delete
CREATE POLICY "product_images_select"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "product_images_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "product_images_update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-images')
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "product_images_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images');

-- ── Grant execute on the RPC function to anon role ──
GRANT EXECUTE ON FUNCTION get_items_paged(INT, INT, TEXT) TO anon;
