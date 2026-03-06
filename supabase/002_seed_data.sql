-- ============================================================
-- OrderHub — Seed Data (90+ Saudi-market products)
-- Run AFTER 001_schema.sql in Supabase SQL Editor
-- ============================================================

INSERT INTO items (item_code, name_en, name_ar, category, price, vat_percentage, image_path) VALUES
-- ── Coffee & Beverages ──
('ITEM-0001', 'Arabic Coffee - Premium Blend', 'قهوة عربية - مزيج فاخر', 'Beverages', 45, 15, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop'),
('ITEM-0002', 'Saudi Champagne Drink', 'شمبانيا السعودية', 'Beverages', 8, 15, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&auto=format&fit=crop'),
('ITEM-0003', 'Turkish Coffee Set', 'طقم قهوة تركية', 'Beverages', 120, 15, 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop'),
('ITEM-0004', 'Green Tea - Lipton Box', 'شاي أخضر - ليبتون', 'Beverages', 18, 15, 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=500&auto=format&fit=crop'),
('ITEM-0005', 'Instant Nescafe 3in1 Pack', 'نسكافيه 3 في 1', 'Beverages', 25, 15, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop'),
('ITEM-0006', 'Fresh Orange Juice 1L', 'عصير برتقال طازج 1 لتر', 'Beverages', 12, 15, 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&auto=format&fit=crop'),
('ITEM-0007', 'Vimto Concentrate 710ml', 'فيمتو مركز 710 مل', 'Beverages', 22, 15, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&auto=format&fit=crop'),
('ITEM-0008', 'Cardamom Karak Tea Box', 'كرك بالهيل', 'Beverages', 30, 15, 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=500&auto=format&fit=crop'),

-- ── Dates & Sweets ──
('ITEM-0009', 'Ajwa Dates - 1kg Premium', 'تمر عجوة المدينة - 1 كجم فاخر', 'Dates & Sweets', 180, 0, 'https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=500&auto=format&fit=crop'),
('ITEM-0010', 'Sukkari Dates - Al Qassim', 'تمر سكري القصيم', 'Dates & Sweets', 85, 0, 'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=500&auto=format&fit=crop'),
('ITEM-0011', 'Medjool Dates 500g', 'تمر مجدول 500 جرام', 'Dates & Sweets', 65, 0, 'https://images.unsplash.com/photo-1563292769-4e05b684851a?w=500&auto=format&fit=crop'),
('ITEM-0012', 'Baklava Assorted Box', 'بقلاوة مشكلة', 'Dates & Sweets', 90, 15, 'https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=500&auto=format&fit=crop'),
('ITEM-0013', 'Kunafa Nabulsi Tray', 'كنافة نابلسية صينية', 'Dates & Sweets', 55, 15, 'https://images.unsplash.com/photo-1579888944880-d98341245702?w=500&auto=format&fit=crop'),
('ITEM-0014', 'Maamoul Date Cookies', 'معمول بالتمر', 'Dates & Sweets', 40, 15, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop'),
('ITEM-0015', 'Halawa Tahinia 500g', 'حلاوة طحينية 500 جرام', 'Dates & Sweets', 20, 15, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop'),
('ITEM-0016', 'Mixed Nuts Premium Bag', 'مكسرات مشكلة فاخرة', 'Dates & Sweets', 75, 15, 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&auto=format&fit=crop'),

-- ── Oud & Perfumes ──
('ITEM-0017', 'Oud Cambodi Premium 12ml', 'عود كمبودي فاخر 12 مل', 'Oud & Perfumes', 350, 15, 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500&auto=format&fit=crop'),
('ITEM-0018', 'Bakhoor Al-Haramain', 'بخور الحرمين', 'Oud & Perfumes', 65, 15, 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=500&auto=format&fit=crop'),
('ITEM-0019', 'Arabian Musk Perfume 100ml', 'عطر مسك عربي 100 مل', 'Oud & Perfumes', 220, 15, 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop'),
('ITEM-0020', 'Bukhoor Chips - Oud Mix', 'رقائق بخور - مزيج عود', 'Oud & Perfumes', 45, 15, 'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?w=500&auto=format&fit=crop'),
('ITEM-0021', 'Incense Burner (Mabkhara)', 'مبخرة تراثية', 'Oud & Perfumes', 150, 15, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop'),
('ITEM-0022', 'Rose Water Perfume Spray', 'بخاخ ماء ورد', 'Oud & Perfumes', 35, 15, 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500&auto=format&fit=crop'),
('ITEM-0023', 'Oud Body Lotion 200ml', 'لوشن جسم بالعود 200 مل', 'Oud & Perfumes', 80, 15, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop'),
('ITEM-0024', 'Dehn Al Oud 3ml', 'دهن العود 3 مل', 'Oud & Perfumes', 500, 15, 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=500&auto=format&fit=crop'),

-- ── Electronics ──
('ITEM-0025', 'iPhone 15 Pro Max 256GB', 'ايفون 15 برو ماكس 256 جيجا', 'Electronics', 5499, 15, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop'),
('ITEM-0026', 'Samsung Galaxy S24 Ultra', 'سامسونج جالكسي S24 الترا', 'Electronics', 4999, 15, 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=500&auto=format&fit=crop'),
('ITEM-0027', 'Apple AirPods Pro 2', 'ايربودز برو 2 من أبل', 'Electronics', 999, 15, 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&auto=format&fit=crop'),
('ITEM-0028', 'PlayStation 5 Console', 'جهاز بلايستيشن 5', 'Electronics', 2299, 15, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&auto=format&fit=crop'),
('ITEM-0029', 'iPad Air M2 256GB', 'ايباد اير M2 256 جيجا', 'Electronics', 3299, 15, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop'),
('ITEM-0030', 'JBL Flip 6 Speaker', 'سماعة جي بي ال فليب 6', 'Electronics', 449, 15, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop'),
('ITEM-0031', 'Apple Watch Series 9', 'ساعة أبل الجيل التاسع', 'Electronics', 1899, 15, 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500&auto=format&fit=crop'),
('ITEM-0032', 'Samsung 65" QLED TV', 'تلفزيون سامسونج 65 بوصة QLED', 'Electronics', 4299, 15, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop'),

-- ── Fashion ──
('ITEM-0033', 'Traditional Thobe - White', 'ثوب أبيض تقليدي', 'Fashion', 350, 15, 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&auto=format&fit=crop'),
('ITEM-0034', 'Shimagh Red Classic', 'شماغ أحمر كلاسيكي', 'Fashion', 120, 15, 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop'),
('ITEM-0035', 'Bisht Formal Cloak', 'بشت رسمي', 'Fashion', 800, 15, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop'),
('ITEM-0036', 'Ghutra White Premium', 'غترة بيضاء فاخرة', 'Fashion', 85, 15, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop'),
('ITEM-0037', 'Leather Sandals - Na''al', 'نعال جلدية', 'Fashion', 200, 15, 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&auto=format&fit=crop'),
('ITEM-0038', 'Abaya Black Embroidered', 'عباية سوداء مطرزة', 'Fashion', 450, 15, 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=500&auto=format&fit=crop'),
('ITEM-0039', 'Casual Sneakers - Nike', 'حذاء رياضي نايكي', 'Fashion', 599, 15, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop'),
('ITEM-0040', 'Sunglasses Ray-Ban Aviator', 'نظارة ريبان أفياتور', 'Fashion', 750, 15, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop'),

-- ── Groceries & Food ──
('ITEM-0041', 'Almarai Full Cream Milk 2L', 'حليب المراعي كامل الدسم 2 لتر', 'Groceries', 12, 0, 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop'),
('ITEM-0042', 'Al Kabeer Chicken Nuggets 1kg', 'نقتس الكبير 1 كجم', 'Groceries', 32, 0, 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop'),
('ITEM-0043', 'Basmati Rice Sella 5kg', 'أرز بسمتي سيلا 5 كجم', 'Groceries', 55, 0, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop'),
('ITEM-0044', 'Extra Virgin Olive Oil 1L', 'زيت زيتون بكر 1 لتر', 'Groceries', 48, 0, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop'),
('ITEM-0045', 'Arabic Bread Pack', 'خبز عربي', 'Groceries', 5, 0, 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500&auto=format&fit=crop'),
('ITEM-0046', 'Saffron Spanish 5g', 'زعفران إسباني 5 جرام', 'Groceries', 95, 0, 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=500&auto=format&fit=crop'),
('ITEM-0047', 'Hummus Fresh Tub 400g', 'حمص طازج 400 جرام', 'Groceries', 14, 0, 'https://images.unsplash.com/photo-1577805947697-89e18249d767?w=500&auto=format&fit=crop'),
('ITEM-0048', 'Kabsa Spice Mix 200g', 'خلطة بهارات كبسة 200 جرام', 'Groceries', 18, 0, 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop'),

-- ── Home & Living ──
('ITEM-0049', 'Arabic Majlis Cushion Set', 'طقم جلسة عربية', 'Home & Living', 1200, 15, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop'),
('ITEM-0050', 'Prayer Mat Premium', 'سجادة صلاة فاخرة', 'Home & Living', 150, 15, 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=500&auto=format&fit=crop'),
('ITEM-0051', 'Incense Holder Ceramic', 'حامل بخور سيراميك', 'Home & Living', 75, 15, 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=500&auto=format&fit=crop'),
('ITEM-0052', 'Arabic Calligraphy Frame', 'لوحة خط عربي', 'Home & Living', 250, 15, 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&auto=format&fit=crop'),
('ITEM-0053', 'Dallah Coffee Pot - Brass', 'دلة قهوة نحاسية', 'Home & Living', 180, 15, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&auto=format&fit=crop'),
('ITEM-0054', 'LED Crescent Moon Lamp', 'فانوس هلال LED', 'Home & Living', 95, 15, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&auto=format&fit=crop'),
('ITEM-0055', 'Bamboo Date Serving Tray', 'صينية تقديم تمر خيزران', 'Home & Living', 65, 15, 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=500&auto=format&fit=crop'),
('ITEM-0056', 'Decorative Lantern Set', 'طقم فوانيس زينة', 'Home & Living', 110, 15, 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&auto=format&fit=crop'),

-- ── Health & Personal Care ──
('ITEM-0057', 'Zamzam Water 5L', 'ماء زمزم 5 لتر', 'Health & Care', 40, 0, 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&auto=format&fit=crop'),
('ITEM-0058', 'Black Seed Oil 250ml', 'زيت حبة البركة 250 مل', 'Health & Care', 55, 0, 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop'),
('ITEM-0059', 'Miswak Natural Tooth Stick', 'مسواك طبيعي', 'Health & Care', 10, 0, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&auto=format&fit=crop'),
('ITEM-0060', 'Sidr Honey Yemeni 500g', 'عسل سدر يمني 500 جرام', 'Health & Care', 250, 0, 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop'),
('ITEM-0061', 'Argan Oil Hair Treatment', 'زيت أرجان للشعر', 'Health & Care', 85, 15, 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&auto=format&fit=crop'),
('ITEM-0062', 'Dead Sea Salt Scrub 500g', 'مقشر ملح البحر الميت 500 جرام', 'Health & Care', 60, 15, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop'),
('ITEM-0063', 'Henna Natural Hair Color', 'حناء طبيعية للشعر', 'Health & Care', 25, 15, 'https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?w=500&auto=format&fit=crop'),
('ITEM-0064', 'Oud Hand Sanitizer 100ml', 'معقم يدين بالعود 100 مل', 'Health & Care', 20, 15, 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=500&auto=format&fit=crop'),

-- ── Automotive ──
('ITEM-0065', 'Car Perfume Oud Hanger', 'معطر سيارة عود معلق', 'Automotive', 35, 15, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&auto=format&fit=crop'),
('ITEM-0066', 'Dash Cam Xiaomi 1080p', 'كاميرا سيارة شاومي', 'Automotive', 299, 15, 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&auto=format&fit=crop'),
('ITEM-0067', 'Tire Inflator Portable', 'منفاخ إطارات متنقل', 'Automotive', 150, 15, 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&auto=format&fit=crop'),
('ITEM-0068', 'Phone Car Mount Magnetic', 'حامل جوال مغناطيسي للسيارة', 'Automotive', 45, 15, 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&auto=format&fit=crop'),
('ITEM-0069', 'Leather Steering Wheel Cover', 'غطاء مقود جلدي', 'Automotive', 80, 15, 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500&auto=format&fit=crop'),
('ITEM-0070', 'Emergency Car Kit', 'حقيبة طوارئ سيارة', 'Automotive', 120, 15, 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&auto=format&fit=crop'),
('ITEM-0071', 'Sun Shade Windshield', 'مظلة زجاج أمامي', 'Automotive', 35, 15, 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=500&auto=format&fit=crop'),
('ITEM-0072', 'Car Vacuum Cleaner Mini', 'مكنسة سيارة صغيرة', 'Automotive', 99, 15, 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&auto=format&fit=crop'),

-- ── Toys & Kids ──
('ITEM-0073', 'Arabic Alphabet Puzzle', 'بزل الحروف العربية', 'Toys & Kids', 35, 15, 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop'),
('ITEM-0074', 'Quran Learning Tablet Kids', 'تابلت تعليم القرآن للأطفال', 'Toys & Kids', 120, 15, 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop'),
('ITEM-0075', 'Building Blocks 200pcs', 'مكعبات بناء 200 قطعة', 'Toys & Kids', 85, 15, 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop'),
('ITEM-0076', 'Remote Control Car 4WD', 'سيارة ريموت 4 دفع', 'Toys & Kids', 150, 15, 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=500&auto=format&fit=crop'),
('ITEM-0077', 'Coloring Art Set 150pcs', 'طقم تلوين 150 قطعة', 'Toys & Kids', 60, 15, 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&auto=format&fit=crop'),
('ITEM-0078', 'Stuffed Camel Plush Toy', 'لعبة جمل قطيفة', 'Toys & Kids', 45, 15, 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500&auto=format&fit=crop'),
('ITEM-0079', 'Kids Prayer Mat Set', 'طقم سجادة صلاة أطفال', 'Toys & Kids', 55, 15, 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop'),
('ITEM-0080', 'Arabic Story Books Set', 'مجموعة قصص عربية', 'Toys & Kids', 75, 15, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop'),

-- ── Sports & Outdoors ──
('ITEM-0081', 'Football Adidas Al-Rihla', 'كرة قدم أديداس الرحلة', 'Sports', 199, 15, 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=500&auto=format&fit=crop'),
('ITEM-0082', 'Camping Tent 4 Person', 'خيمة تخييم 4 أشخاص', 'Sports', 450, 15, 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&auto=format&fit=crop'),
('ITEM-0083', 'Yeti Water Bottle 1L', 'قارورة يتي 1 لتر', 'Sports', 180, 15, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop'),
('ITEM-0084', 'Resistance Bands Set', 'طقم أحزمة مقاومة', 'Sports', 65, 15, 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&auto=format&fit=crop'),
('ITEM-0085', 'Yoga Mat Premium 6mm', 'بساط يوقا فاخر 6 مم', 'Sports', 95, 15, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&auto=format&fit=crop'),
('ITEM-0086', 'Arabic Falcon Training Glove', 'قفاز تدريب صقور', 'Sports', 350, 15, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&auto=format&fit=crop'),
('ITEM-0087', 'Fishing Rod Portable Kit', 'طقم صنارة صيد متنقل', 'Sports', 220, 15, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop'),
('ITEM-0088', 'Binoculars 10x42 HD', 'منظار 10×42 عالي الدقة', 'Sports', 280, 15, 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=500&auto=format&fit=crop'),

-- ── Stationery & Office ──
('ITEM-0089', 'Quran Stand Wooden', 'حامل مصحف خشبي', 'Stationery', 90, 15, 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=500&auto=format&fit=crop'),
('ITEM-0090', 'Arabic Calligraphy Pen Set', 'طقم أقلام خط عربي', 'Stationery', 120, 15, 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&auto=format&fit=crop'),
('ITEM-0091', 'Desk Organizer Bamboo', 'منظم مكتب خيزران', 'Stationery', 65, 15, 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop'),
('ITEM-0092', 'Notebook A5 Leather Cover', 'دفتر A5 غلاف جلدي', 'Stationery', 40, 15, 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&auto=format&fit=crop'),
('ITEM-0093', 'Whiteboard 60x90cm', 'سبورة بيضاء 60×90 سم', 'Stationery', 85, 15, 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=500&auto=format&fit=crop'),
('ITEM-0094', 'Calculator Casio Scientific', 'آلة حاسبة كاسيو علمية', 'Stationery', 55, 15, 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=500&auto=format&fit=crop'),
('ITEM-0095', 'Planner 2025 Weekly', 'مفكرة أسبوعية 2025', 'Stationery', 45, 15, 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&auto=format&fit=crop'),
('ITEM-0096', 'Ink Cartridges Color Pack', 'حبر طابعة ألوان', 'Stationery', 110, 15, 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&auto=format&fit=crop');
