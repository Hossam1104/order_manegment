namespace OrderManagement.API;

public static class SeedDataGenerator
{
    private static readonly List<SeedProduct> Products = new()
    {
        // ── Coffee & Beverages ──
        new("Arabic Coffee - Premium Blend", "قهوة عربية - مزيج فاخر", "Beverages", 45, 15, "photo-1509042239860-f550ce710b93"),
        new("Saudi Champagne Drink", "شمبانيا السعودية", "Beverages", 8, 15, "photo-1556679343-c7306c1976bc"),
        new("Turkish Coffee Set", "طقم قهوة تركية", "Beverages", 120, 15, "photo-1544787219-7f47ccb76574"),
        new("Green Tea - Lipton Box", "شاي أخضر - ليبتون", "Beverages", 18, 15, "photo-1556881286-fc6915169721"),
        new("Instant Nescafe 3in1 Pack", "نسكافيه 3 في 1", "Beverages", 25, 15, "photo-1559056199-641a0ac8b55e"),
        new("Fresh Orange Juice 1L", "عصير برتقال طازج 1 لتر", "Beverages", 12, 15, "photo-1621506289937-a8e4df240d0b"),
        new("Vimto Concentrate 710ml", "فيمتو مركز 710 مل", "Beverages", 22, 15, "photo-1600271886742-f049cd451bba"),
        new("Cardamom Karak Tea Box", "كرك بالهيل", "Beverages", 30, 15, "photo-1558160074-4d7d8bdf4256"),

        // ── Dates & Sweets ──
        new("Ajwa Dates - 1kg Premium", "تمر عجوة المدينة - 1 كجم فاخر", "Dates & Sweets", 180, 0, "photo-1598110750624-207050c4f28c"),
        new("Sukkari Dates - Al Qassim", "تمر سكري القصيم", "Dates & Sweets", 85, 0, "photo-1597714026720-8f74c62310ba"),
        new("Medjool Dates 500g", "تمر مجدول 500 جرام", "Dates & Sweets", 65, 0, "photo-1563292769-4e05b684851a"),
        new("Baklava Assorted Box", "بقلاوة مشكلة", "Dates & Sweets", 90, 15, "photo-1598110750624-207050c4f28c"),
        new("Kunafa Nabulsi Tray", "كنافة نابلسية صينية", "Dates & Sweets", 55, 15, "photo-1579888944880-d98341245702"),
        new("Maamoul Date Cookies", "معمول بالتمر", "Dates & Sweets", 40, 15, "photo-1558961363-fa8fdf82db35"),
        new("Halawa Tahinia 500g", "حلاوة طحينية 500 جرام", "Dates & Sweets", 20, 15, "photo-1509440159596-0249088772ff"),
        new("Mixed Nuts Premium Bag", "مكسرات مشكلة فاخرة", "Dates & Sweets", 75, 15, "photo-1599599810769-bcde5a160d32"),

        // ── Oud & Perfumes ──
        new("Oud Cambodi Premium 12ml", "عود كمبودي فاخر 12 مل", "Oud & Perfumes", 350, 15, "photo-1615634260167-c8cdede054de"),
        new("Bakhoor Al-Haramain", "بخور الحرمين", "Oud & Perfumes", 65, 15, "photo-1547887538-e3a2f32cb1cc"),
        new("Arabian Musk Perfume 100ml", "عطر مسك عربي 100 مل", "Oud & Perfumes", 220, 15, "photo-1541643600914-78b084683601"),
        new("Bukhoor Chips - Oud Mix", "رقائق بخور - مزيج عود", "Oud & Perfumes", 45, 15, "photo-1592914610354-fd354ea45e48"),
        new("Incense Burner (Mabkhara)", "مبخرة تراثية", "Oud & Perfumes", 150, 15, "photo-1602143407151-7111542de6e8"),
        new("Rose Water Perfume Spray", "بخاخ ماء ورد", "Oud & Perfumes", 35, 15, "photo-1588405748880-12d1d2a59f75"),
        new("Oud Body Lotion 200ml", "لوشن جسم بالعود 200 مل", "Oud & Perfumes", 80, 15, "photo-1608571423902-eed4a5ad8108"),
        new("Dehn Al Oud 3ml", "دهن العود 3 مل", "Oud & Perfumes", 500, 15, "photo-1615634260167-c8cdede054de"),

        // ── Electronics ──
        new("iPhone 15 Pro Max 256GB", "ايفون 15 برو ماكس 256 جيجا", "Electronics", 5499, 15, "photo-1695048133142-1a20484d2569"),
        new("Samsung Galaxy S24 Ultra", "سامسونج جالكسي S24 الترا", "Electronics", 4999, 15, "photo-1610945264803-c22b62d2a7b3"),
        new("Apple AirPods Pro 2", "ايربودز برو 2 من أبل", "Electronics", 999, 15, "photo-1606220588913-b3aacb4d2f46"),
        new("PlayStation 5 Console", "جهاز بلايستيشن 5", "Electronics", 2299, 15, "photo-1606144042614-b2417e99c4e3"),
        new("iPad Air M2 256GB", "ايباد اير M2 256 جيجا", "Electronics", 3299, 15, "photo-1544244015-0df4b3ffc6b0"),
        new("JBL Flip 6 Speaker", "سماعة جي بي ال فليب 6", "Electronics", 449, 15, "photo-1608043152269-423dbba4e7e1"),
        new("Apple Watch Series 9", "ساعة أبل الجيل التاسع", "Electronics", 1899, 15, "photo-1551816230-ef5deaed4a26"),
        new("Samsung 65\" QLED TV", "تلفزيون سامسونج 65 بوصة QLED", "Electronics", 4299, 15, "photo-1593359677879-a4bb92f829d1"),

        // ── Fashion ──
        new("Traditional Thobe - White", "ثوب أبيض تقليدي", "Fashion", 350, 15, "photo-1589998059171-988d887df646"),
        new("Shimagh Red Classic", "شماغ أحمر كلاسيكي", "Fashion", 120, 15, "photo-1618354691373-d851c5c3a990"),
        new("Bisht Formal Cloak", "بشت رسمي", "Fashion", 800, 15, "photo-1594938298603-c8148c4dae35"),
        new("Ghutra White Premium", "غترة بيضاء فاخرة", "Fashion", 85, 15, "photo-1583743814966-8936f5b7be1a"),
        new("Leather Sandals - Na'al", "نعال جلدية", "Fashion", 200, 15, "photo-1603487742131-4160ec999306"),
        new("Abaya Black Embroidered", "عباية سوداء مطرزة", "Fashion", 450, 15, "photo-1590735213920-68192a487bc2"),
        new("Casual Sneakers - Nike", "حذاء رياضي نايكي", "Fashion", 599, 15, "photo-1542291026-7eec264c27ff"),
        new("Sunglasses Ray-Ban Aviator", "نظارة ريبان أفياتور", "Fashion", 750, 15, "photo-1572635196237-14b3f281503f"),

        // ── Groceries & Food ──
        new("Almarai Full Cream Milk 2L", "حليب المراعي كامل الدسم 2 لتر", "Groceries", 12, 0, "photo-1563636619-e9143da7973b"),
        new("Al Kabeer Chicken Nuggets 1kg", "نقتس الكبير 1 كجم", "Groceries", 32, 0, "photo-1562967914-608f82629710"),
        new("Basmati Rice Sella 5kg", "أرز بسمتي سيلا 5 كجم", "Groceries", 55, 0, "photo-1586201375761-83865001e31c"),
        new("Extra Virgin Olive Oil 1L", "زيت زيتون بكر 1 لتر", "Groceries", 48, 0, "photo-1546069901-ba9599a7e63c"),
        new("Arabic Bread Pack", "خبز عربي", "Groceries", 5, 0, "photo-1549931319-a545dcf3bc73"),
        new("Saffron Spanish 5g", "زعفران إسباني 5 جرام", "Groceries", 95, 0, "photo-1600880292089-90a7e086ee0c"),
        new("Hummus Fresh Tub 400g", "حمص طازج 400 جرام", "Groceries", 14, 0, "photo-1577805947697-89e18249d767"),
        new("Kabsa Spice Mix 200g", "خلطة بهارات كبسة 200 جرام", "Groceries", 18, 0, "photo-1596040033229-a9821ebd058d"),

        // ── Home & Living ──
        new("Arabic Majlis Cushion Set", "طقم جلسة عربية", "Home & Living", 1200, 15, "photo-1555041469-a586c61ea9bc"),
        new("Prayer Mat Premium", "سجادة صلاة فاخرة", "Home & Living", 150, 15, "photo-1519817650390-64a93db51149"),
        new("Incense Holder Ceramic", "حامل بخور سيراميك", "Home & Living", 75, 15, "photo-1602028915047-37269d1a73f7"),
        new("Arabic Calligraphy Frame", "لوحة خط عربي", "Home & Living", 250, 15, "photo-1579783902614-a3fb3927b6a5"),
        new("Dallah Coffee Pot - Brass", "دلة قهوة نحاسية", "Home & Living", 180, 15, "photo-1514228742587-6b1558fcca3d"),
        new("LED Crescent Moon Lamp", "فانوس هلال LED", "Home & Living", 95, 15, "photo-1513506003901-1e6a229e2d15"),
        new("Bamboo Date Serving Tray", "صينية تقديم تمر خيزران", "Home & Living", 65, 15, "photo-1506806732259-39c2d0268443"),
        new("Decorative Lantern Set", "طقم فوانيس زينة", "Home & Living", 110, 15, "photo-1530103862676-de8c9debad1d"),

        // ── Health & Personal Care ──
        new("Zamzam Water 5L", "ماء زمزم 5 لتر", "Health & Care", 40, 0, "photo-1548839140-29a749e1cf4d"),
        new("Black Seed Oil 250ml", "زيت حبة البركة 250 مل", "Health & Care", 55, 0, "photo-1608571423902-eed4a5ad8108"),
        new("Miswak Natural Tooth Stick", "مسواك طبيعي", "Health & Care", 10, 0, "photo-1559056199-641a0ac8b55e"),
        new("Sidr Honey Yemeni 500g", "عسل سدر يمني 500 جرام", "Health & Care", 250, 0, "photo-1587049352846-4a222e784d38"),
        new("Argan Oil Hair Treatment", "زيت أرجان للشعر", "Health & Care", 85, 15, "photo-1608248543803-ba4f8c70ae0b"),
        new("Dead Sea Salt Scrub 500g", "مقشر ملح البحر الميت 500 جرام", "Health & Care", 60, 15, "photo-1570172619644-dfd03ed5d881"),
        new("Henna Natural Hair Color", "حناء طبيعية للشعر", "Health & Care", 25, 15, "photo-1596178060810-72f53ce9a65c"),
        new("Oud Hand Sanitizer 100ml", "معقم يدين بالعود 100 مل", "Health & Care", 20, 15, "photo-1584483766114-2cea6facdf57"),

        // ── Automotive ──
        new("Car Perfume Oud Hanger", "معطر سيارة عود معلق", "Automotive", 35, 15, "photo-1503376780353-7e6692767b70"),
        new("Dash Cam Xiaomi 1080p", "كاميرا سيارة شاومي", "Automotive", 299, 15, "photo-1617788138017-80ad40651399"),
        new("Tire Inflator Portable", "منفاخ إطارات متنقل", "Automotive", 150, 15, "photo-1486262715619-67b85e0b08d3"),
        new("Phone Car Mount Magnetic", "حامل جوال مغناطيسي للسيارة", "Automotive", 45, 15, "photo-1544620347-c4fd4a3d5957"),
        new("Leather Steering Wheel Cover", "غطاء مقود جلدي", "Automotive", 80, 15, "photo-1549399542-7e3f8b79c341"),
        new("Emergency Car Kit", "حقيبة طوارئ سيارة", "Automotive", 120, 15, "photo-1600880292203-757bb62b4baf"),
        new("Sun Shade Windshield", "مظلة زجاج أمامي", "Automotive", 35, 15, "photo-1619767886558-efdc259cde1a"),
        new("Car Vacuum Cleaner Mini", "مكنسة سيارة صغيرة", "Automotive", 99, 15, "photo-1558317374-067fb5f30001"),

        // ── Toys & Kids ──
        new("Arabic Alphabet Puzzle", "بزل الحروف العربية", "Toys & Kids", 35, 15, "photo-1596461404969-9ae70f2830c1"),
        new("Quran Learning Tablet Kids", "تابلت تعليم القرآن للأطفال", "Toys & Kids", 120, 15, "photo-1515488042361-ee00e0ddd4e4"),
        new("Building Blocks 200pcs", "مكعبات بناء 200 قطعة", "Toys & Kids", 85, 15, "photo-1596461404969-9ae70f2830c1"),
        new("Remote Control Car 4WD", "سيارة ريموت 4 دفع", "Toys & Kids", 150, 15, "photo-1594787318286-3d835c1d207f"),
        new("Coloring Art Set 150pcs", "طقم تلوين 150 قطعة", "Toys & Kids", 60, 15, "photo-1513364776144-60967b0f800f"),
        new("Stuffed Camel Plush Toy", "لعبة جمل قطيفة", "Toys & Kids", 45, 15, "photo-1585366119957-e9730b6d0f60"),
        new("Kids Prayer Mat Set", "طقم سجادة صلاة أطفال", "Toys & Kids", 55, 15, "photo-1596461404969-9ae70f2830c1"),
        new("Arabic Story Books Set", "مجموعة قصص عربية", "Toys & Kids", 75, 15, "photo-1512820790803-83ca734da794"),

        // ── Sports & Outdoors ──
        new("Football Adidas Al-Rihla", "كرة قدم أديداس الرحلة", "Sports", 199, 15, "photo-1614632537197-38a17061c2bd"),
        new("Camping Tent 4 Person", "خيمة تخييم 4 أشخاص", "Sports", 450, 15, "photo-1504280390367-361c6d9f38f4"),
        new("Yeti Water Bottle 1L", "قارورة يتي 1 لتر", "Sports", 180, 15, "photo-1602143407151-7111542de6e8"),
        new("Resistance Bands Set", "طقم أحزمة مقاومة", "Sports", 65, 15, "photo-1598289431512-b97b0917affc"),
        new("Yoga Mat Premium 6mm", "بساط يوقا فاخر 6 مم", "Sports", 95, 15, "photo-1601925260368-ae2f83cf8b7f"),
        new("Arabic Falcon Training Glove", "قفاز تدريب صقور", "Sports", 350, 15, "photo-1551698618-1dfe5d97d256"),
        new("Fishing Rod Portable Kit", "طقم صنارة صيد متنقل", "Sports", 220, 15, "photo-1544947950-fa07a98d237f"),
        new("Binoculars 10x42 HD", "منظار 10×42 عالي الدقة", "Sports", 280, 15, "photo-1452421822248-d4c2b47f0c81"),

        // ── Stationery & Office ──
        new("Quran Stand Wooden", "حامل مصحف خشبي", "Stationery", 90, 15, "photo-1609599006353-e629aaabfeae"),
        new("Arabic Calligraphy Pen Set", "طقم أقلام خط عربي", "Stationery", 120, 15, "photo-1513542789411-b6a5d4f31634"),
        new("Desk Organizer Bamboo", "منظم مكتب خيزران", "Stationery", 65, 15, "photo-1544816155-12df9643f363"),
        new("Notebook A5 Leather Cover", "دفتر A5 غلاف جلدي", "Stationery", 40, 15, "photo-1531346878377-a5be20888e57"),
        new("Whiteboard 60x90cm", "سبورة بيضاء 60×90 سم", "Stationery", 85, 15, "photo-1532619675605-1ede6c2ed2b0"),
        new("Calculator Casio Scientific", "آلة حاسبة كاسيو علمية", "Stationery", 55, 15, "photo-1564466809058-bf4114d55352"),
        new("Planner 2025 Weekly", "مفكرة أسبوعية 2025", "Stationery", 45, 15, "photo-1506784983877-45594efa4cbe"),
        new("Ink Cartridges Color Pack", "حبر طابعة ألوان", "Stationery", 110, 15, "photo-1612815154858-60aa4c59eaa6"),
    };

    public static List<Item> Generate(int count, int startOffset, string category)
    {
        var filtered = category is null or "" or "All"
            ? Products
            : Products.Where(p => p.Category.Equals(category, StringComparison.OrdinalIgnoreCase)).ToList();

        if (filtered.Count == 0)
            filtered = Products;

        var items = new List<Item>();
        var random = new Random(42); // deterministic seed for reproducibility

        for (int i = 0; i < count; i++)
        {
            int idx = i % filtered.Count;
            SeedProduct template = filtered[idx];
            int itemNumber = startOffset + i + 1;

            // Add slight price variation for duplicates beyond first pass
            decimal priceVariation = i >= filtered.Count ? random.Next(-10, 20) : 0;
            decimal finalPrice = Math.Max(1, template.Price + priceVariation);

            items.Add(new Item
            {
                ItemCode = $"ITEM-{itemNumber:D4}",
                NameEN = i >= filtered.Count ? $"{template.NameEN} #{i / filtered.Count + 1}" : template.NameEN,
                NameAR = i >= filtered.Count ? $"{template.NameAR} #{i / filtered.Count + 1}" : template.NameAR,
                Category = template.Category,
                ImagePath = $"https://images.unsplash.com/{template.UnsplashId}?w=500&auto=format&fit=crop",
                Price = finalPrice,
                VatPercentage = template.Vat,
                CreatedAt = DateTime.UtcNow
            });
        }

        return items;
    }

    private record SeedProduct(string NameEN, string NameAR, string Category, decimal Price, decimal Vat, string UnsplashId);
}
