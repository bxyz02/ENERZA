// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Wishlist Functionality
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');

    wishlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            const icon = button.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ff4757';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        });
    });

    // Buy Now Functionality - Show Checkout Page
    const buyNowButtons = document.querySelectorAll('.buy-now-btn');

    buyNowButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const product = button.getAttribute('data-product');
            const price = button.getAttribute('data-price');

            // Store product info in localStorage to use on checkout page
            localStorage.setItem('product', product);
            localStorage.setItem('price', price);
            
            // Redirect to checkout page
            window.location.href = 'checkout.html';
        });
    });

    // Checkout Page Functionality (only on checkout.html)
    if (window.location.pathname.includes('checkout.html')) {
        // Get product info from localStorage
        const product = localStorage.getItem('product');
        const price = localStorage.getItem('price');

        if (product && price) {
            document.querySelector('.checkout-product h3').textContent = product;
            document.querySelector('.checkout-product-price').textContent = price + ' DA';
        }

        // Checkout Steps Navigation
        const toShippingInfo = document.getElementById('toShippingInfo');
        const backToPersonalInfo = document.getElementById('backToPersonalInfo');
        const toPayment = document.getElementById('toPayment');
        const backToShippingInfo = document.getElementById('backToShippingInfo');
        const personalInfoForm = document.getElementById('personalInfoForm');
        const shippingInfoForm = document.getElementById('shippingInfoForm');
        const paymentForm = document.getElementById('paymentForm');
        const step1 = document.getElementById('step1');
        const step2 = document.getElementById('step2');
        const step3 = document.getElementById('step3');

        if (toShippingInfo && personalInfoForm && shippingInfoForm) {
            toShippingInfo.addEventListener('click', () => {
                // Validate personal info form
                const fullName = document.getElementById('fullName').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;

                if (!fullName || !email || !phone) {
                    alert('Please fill in all required fields');
                    return;
                }

                personalInfoForm.style.display = 'none';
                shippingInfoForm.style.display = 'block';
                step1.classList.remove('active');
                step1.classList.add('completed');
                step2.classList.add('active');
            });
        }

        if (backToPersonalInfo && personalInfoForm && shippingInfoForm) {
            backToPersonalInfo.addEventListener('click', () => {
                shippingInfoForm.style.display = 'none';
                personalInfoForm.style.display = 'block';
                step2.classList.remove('active');
                step1.classList.add('active');
                step1.classList.remove('completed');
            });
        }

        if (toPayment && shippingInfoForm && paymentForm) {
            toPayment.addEventListener('click', () => {
                // Validate shipping info form
                const address = document.getElementById('address').value;
                const wilaya = document.getElementById('wilaya').value;
                const commune = document.getElementById('commune').value;

                if (!address || !wilaya || !commune) {
                    alert('Please fill in all required fields');
                    return;
                }

                shippingInfoForm.style.display = 'none';
                paymentForm.style.display = 'block';
                step2.classList.remove('active');
                step2.classList.add('completed');
                step3.classList.add('active');
            });
        }

        if (backToShippingInfo && shippingInfoForm && paymentForm) {
            backToShippingInfo.addEventListener('click', () => {
                paymentForm.style.display = 'none';
                shippingInfoForm.style.display = 'block';
                step3.classList.remove('active');
                step2.classList.add('active');
                step2.classList.remove('completed');
            });
        }

        // Quantity Adjustments
        const decreaseQty = document.getElementById('decrease-qty');
        const increaseQty = document.getElementById('increase-qty');
        const quantityInput = document.getElementById('quantity');

        if (decreaseQty && quantityInput) {
            decreaseQty.addEventListener('click', (e) => {
                e.preventDefault();
                let currentValue = parseInt(quantityInput.value);
                if (currentValue > 1) {
                    quantityInput.value = currentValue - 1;
                }
            });
        }

        if (increaseQty && quantityInput) {
            increaseQty.addEventListener('click', (e) => {
                e.preventDefault();
                let currentValue = parseInt(quantityInput.value);
                quantityInput.value = currentValue + 1;
            });
        }

        // Wilaya and Commune Selection
        const wilayaSelect = document.getElementById('wilaya');
        const communeSelect = document.getElementById('commune');

        if (wilayaSelect && communeSelect) {
            // Communes data for each wilaya (simplified example)
            const communesData = {
                Adrar: [
                    "Adrar", "Zaouiet Kounta", "Reggane", "Aoulef", "Timimoun",
                    "Fenoughil", "Tinerkouk", "Aougrout", "Bordj Badji Mokhtar",
                    "Tsabit", "Ouled Ahmed Timmi", "Bouda", "In Zghmir", "Tit",
                    "Sali", "Akabli", "Metarfa", "Ouled Saïd", "Deldoul",
                    "Sebaa", "Tamest", "Timiaouine", "Ouled Aissa", "Charouine",
                    "Talmine", "Ouled Khoudir", "Hassi Abdallah", "Ouled Ali"
                ],
                Chlef: [
                    "Chlef", "Oued Fodda", "Zeboudja", "Ouled Fares", "Tenes",
                    "El Karimia", "Taougrit", "Benairia", "Boukadir", "Beni Haoua",
                    "El Marsa", "Chettia", "Sidi Akkacha", "Harchoun", "Ouled Abbes",
                    "Sendjas", "Zeboudja", "Oued Goussine", "Dahra", "Sidi Moussa",
                    "Ouled Ben Abdelkader", "Tadjena", "Talassa", "Beni Rached",
                    "Sobha", "Harenfa", "Oued Sly", "Abou El Hassen", "El Hadjadj",
                    "Labiod Medjadja", "Oued Sly", "Ouled Ben Abdelkader", "Breira",
                    "Beni Bouateb", "El Marssa"
                ],
                Laghouat: [
                    "Laghouat", "Ksar El Hirane", "Aflou", "Oued Morra",
                    "Gueltat Sidi Saad", "Hassi R'Mel", "Tadjmout", "Tadjrouna",
                    "Ain Madhi", "Brida", "El Ghicha", "Hassi Delaa", "Sidi Makhlouf",
                    "Hassi R'Mel", "Oued M'Zi", "Tadjrouna", "El Assafia",
                    "Sidi Bouzid", "Taouiala", "Kheneg", "El Haouaita", "Sidi Slimane",
                    "Sebgag", "El Beidh", "Hadj Mechri", "El Houaita", "Oued Cheham",
                    "El Kheneg"
                ],
                OumElBouaghi: [
                    "Oum El Bouaghi", "Ain Beida", "Ksar Sbahi", "Ain Babouche",
                    "Berriche", "El Amiria", "Dhalaa", "Ain Kercha", "Fkirina",
                    "Meskiana", "El Belala", "El Hamma", "Ain Diss", "El Djazia",
                    "El Fedjoudj", "Ouled Hamla", "Ouled Zouai", "Bir Chouhada",
                    "Sigus", "Ouled Gacem", "El Harmilia", "Ain Zitoun", "Ouled Maaref",
                    "El Aouinet", "El Anasser", "Zorg", "El Ayeb", "Ouled Chebel"
                ],
                Batna: [
                    "Batna", "Merouana", "Seriana", "Tazoult", "Arris",
                    "Barika", "Djezzar", "Chemora", "Ain Touta", "N'Gaous",
                    "Ouled Selam", "T'Kout", "Menaa", "El Madher", "Bouzina",
                    "Lazrou", "Timgad", "Ras El Aioun", "Fesdis", "Seggana",
                    "Ouled Ammar", "Ouled Aouf", "Boumagueur", "Bitam", "Ghassira",
                    "Djerma", "Ouled Fadel", "Tighanimine", "Ain Yagout", "Ouyoun El Assafir"
                ],
                Bejaia: [
                    "Bejaia", "Amizour", "Souk El Tenine", "Tichy", "Sidi Aich",
                    "Akbou", "Kherrata", "Darguina", "Toudja", "Barbacha",
                    "Adekar", "Ait R'Zine", "Ait Smail", "Aokas", "Beni Djellil",
                    "Beni Ksila", "Boudjellil", "Bouhamza", "Chemini", "Derguina",
                    "El Kseur", "Fenaia Ilmaten", "Ferraoun", "Ighil Ali", "Kendira",
                    "Ouzellaguen", "Seddouk", "Semaoun", "Sidi Ayad", "Souk Oufella",
                    "Taskriout", "Tibane", "Timezrit", "Tizi N'Berber", "Toudja"
                ],
                Biskra: [
                    "Biskra", "Sidi Okba", "Ourlal", "Tolga", "Djemorah",
                    "El Outaya", "M'Chouneche", "Zeribet El Oued", "El Kantara",
                    "Ain Zaatout", "Branis", "Chetma", "El Feidh", "El Ghrous",
                    "El Hadjab", "El Haouch", "Foughala", "Khenguet Sidi Nadji",
                    "Lichana", "Lioua", "M'Lili", "Oumache", "Ourlal", "Ras El Miaad",
                    "Sidi Khaled", "Sidi Slimane", "Tolga", "Zeribet El Oued"
                ],
                Bechar: [
                    "Bechar", "Ouled Khoudir", "Meridja", "Lahmar", "Beni Abbes",
                    "Kenadsa", "Igli", "Tabelbala", "Taghit", "El Ouata",
                    "Abadla", "Boukais", "Erg Ferradj", "Kerzaz", "Ksabi",
                    "Mechraa Houari Boumediene", "Ouled Khodeir", "Tamtert",
                    "Timoudi", "Tabelbala", "Beni Ikhlef", "Beni Ounif", "El Ouata",
                    "Mogheul", "Ouled Khoudir"
                ],
                Blida: [
                    "Blida", "Oued El Alleug", "Bouinan", "Boufarik", "Larbaa",
                    "Meftah", "Ouled Yaich", "Beni Tamou", "Bouarfa", "Soumaa",
                    "Ain Romana", "Beni Merad", "Beni Tamou", "Bouarfa", "Boufarik",
                    "Bouinan", "Chebli", "Chiffa", "El Affroun", "Hammam Melouane",
                    "Larbaa", "Meftah", "Mouzaia", "Oued Djer", "Oued El Alleug",
                    "Ouled Slama", "Ouled Yaich", "Souhane", "Soumaa", "Tablat"
                ],
                Bouira: [
                    "Bouira", "El Asnam", "Sour El Ghozlane", "Bordj Okhriss",
                    "M'Chedallah", "Ain Bessam", "Bir Ghbalou", "Hadjera Zerga",
                    "Dechmia", "Lakhdaria", "Ahnif", "Ain El Hadjar", "Ain Turk",
                    "Ait Laaziz", "Ath Mansour", "Bechloul", "Bordj Okhriss",
                    "Bouderbala", "Bouira", "Boukram", "Chorfa", "Dechmia",
                    "Dirrah", "Djebahia", "El Adjiba", "El Asnam", "El Hachimia",
                    "El Khabouzia", "El Mokrani", "Guerrouma", "Hadjera Zerga",
                    "Haizer", "Kadiria", "Lakhdaria", "M'Chedallah", "Maala",
                    "Maamora", "Oued El Berdi", "Ouled Rached", "Raouraoua",
                    "Ridane", "Saharidj", "Sour El Ghozlane", "Taghzout",
                    "Taguedit", "Z'barbar"
                ],
                Tamanrasset: [
                    "Tamanrasset", "Abalessa", "In Ghar", "In Guezzam", "In Salah",
                    "Tin Zaouatine", "Tazrouk", "Idles", "Tinerkouk", "Ain Guezzam",
                    "Ain Salah", "Foggaret Ezzaouia", "Tamanrasset", "Tazrouk",
                    "Tin Zaouatine"
                ],
                Tebessa: [
                    "Tebessa", "Bir El Ater", "Cheria", "Stah Guentis",
                    "El Aouinet", "Negrine", "Bir Mokadem", "Morsott",
                    "El Kouif", "Ouenza", "Ain Zerga", "Bekkaria", "Boulhaf Dir",
                    "El Ma Labiodh", "El Meridj", "El Mezerra", "El Ogla",
                    "Ferkane", "Guorriguer", "Hammamet", "Lahouidjbet", "Morsott",
                    "Negrine", "Ouenza", "Oum Ali", "Saf Saf El Ouesra",
                    "Stah Guentis", "Tebessa", "Tlidjene", "Zouabi"
                ],
                Tlemcen: [
                    "Tlemcen", "Beni Snous", "Bab El Assa", "Remchi",
                    "Sebdou", "Mansourah", "Beni Boussaid", "Maghnia",
                    "Hennaya", "Souahlia", "Ain Fezza", "Ain Ghoraba",
                    "Ain Kebira", "Ain Nehala", "Ain Tallout", "Ain Youcef",
                    "Amieur", "Azails", "Bensekrane", "Bouhlou", "Chetouane",
                    "El Aricha", "El Bouihi", "El Fehoul", "El Gor",
                    "Hammam Boughrara", "Hennaya", "Honaine", "Maghnia",
                    "Mansourah", "Marsa Ben M'Hidi", "Nedroma", "Oued Chouly",
                    "Ouled Mimoun", "Ouled Riyah", "Remchi", "Sabra",
                    "Sebbaa Chioukh", "Sebdou", "Sidi Abdelli", "Sidi Djillali",
                    "Sidi Medjahed", "Souahlia", "Souani", "Terny",
                    "Tienet", "Tlemcen", "Zenata"
                ],
                Tiaret: [
                    "Tiaret", "Medroussa", "Ain Deheb", "Sougueur",
                    "Mahdia", "Frenda", "Ksar Chellala", "Dahmouni",
                    "Tousnina", "Ain Kermes", "Ain Bouchekif", "Ain Deheb",
                    "Ain El Hadid", "Ain Kermes", "Ain Zarit", "Bougara",
                    "Chehaima", "Dahmouni", "Djebilet Rosfa", "Faidja",
                    "Frenda", "Guertoufa", "Hamadia", "Ksar Chellala",
                    "Madna", "Mahdia", "Mechraa Safa", "Medrissa",
                    "Medroussa", "Meghila", "Mellakou", "Nadorah",
                    "Naima", "Oued Lilli", "Rahouia", "Rechaiga",
                    "Sebaine", "Sebt", "Serghine", "Si Abdelghani",
                    "Sidi Abderrahmane", "Sidi Ali Mellal", "Sidi Bakhti",
                    "Sidi Hosni", "Sougueur", "Tagdemt", "Takhemaret",
                    "Tiaret", "Tidda", "Tousnina", "Zmalet El Emir Abdelkader"
                ],
                TiziOuzou: [
                    "Tizi Ouzou", "Azeffoun", "Ain El Hammam", "Azazga",
                    "Tigzirt", "Draa Ben Khedda", "Mekla", "Boghni",
                    "Ouadhia", "Freha", "Abi Youcef", "Aghrib", "Ain El Hammam",
                    "Ait Aggouacha", "Ait Bouadou", "Ait Chafaa", "Ait Khellili",
                    "Ait Mahmoud", "Ait Ouabane", "Ait Toudert", "Ait Yahia",
                    "Ait Yahia Moussa", "Akbil", "Azeffoun", "Azazga",
                    "Azeffoun", "Beni Douala", "Beni Yenni", "Boghni",
                    "Boudjima", "Bounouh", "Bouzeguene", "Draa Ben Khedda",
                    "Draa El Mizan", "Freha", "Frikat", "Iboudrarene",
                    "Idjeur", "Iferhounene", "Ifigha", "Iflissen", "Illilten",
                    "Illoula Oumalou", "Imsouhal", "Irdjen", "Larba Nath Irathen",
                    "M'Kira", "Maatkas", "Makouda", "Mechtras", "Mekla",
                    "Mizrana", "Ouacif", "Ouadhia", "Ouaguenoun", "Sidi Naamane",
                    "Souk El Thenine", "Tadmait", "Tigzirt", "Tirmitine",
                    "Tizi Ghenif", "Tizi Ouzou", "Tizi Rached", "Yakouren",
                    "Yatafene", "Zekri"
                ],
                Alger: [
                    "Alger Centre", "Sidi M'Hamed", "El Madania", "El Harrach",
                    "Bab Ezzouar", "Bordj El Kiffan", "Hussein Dey", "Kouba",
                    "Birkhadem", "Dar El Beida", "Baba Hassen", "Baraki",
                    "Ben Aknoun", "Birtouta", "Bologhine", "Bordj El Bahri",
                    "Bourouba", "Casbah", "Cheraga", "Djasr Kasentina",
                    "Douera", "Draria", "El Achour", "El Biar", "El Hammamet",
                    "El Magharia", "El Mouradia", "Hamma Annassers", "Hydra",
                    "Khraicia", "Les Eucalyptus", "Mahelma", "Mohammadia",
                    "Oued Koriche", "Oued Smar", "Ouled Chebel", "Ouled Fayet",
                    "Rais Hamidou", "Reghaia", "Rouiba", "Sehaoula",
                    "Sidi Moussa", "Souidania", "Staoueli", "Tessala El Merdja",
                    "Zeralda"
                ],
                Djelfa: [
                    "Djelfa", "Hassi Bahbah", "Ain Maabed", "Sed Rahal",
                    "El Idrissia", "Messad", "Had Sahary", "Charef",
                    "Birine", "Bouira Lahdab", "Ain Chouhada", "Ain El Ibel",
                    "Ain Feka", "Ain Oussera", "Amourah", "Benhar",
                    "Beni Yagoub", "Birine", "Bouira Lahdab", "Charef",
                    "Dar Chioukh", "Djelfa", "Douis", "El Guedid",
                    "El Idrissia", "El Khemis", "Faidh El Botma", "Guernini",
                    "Hassi Bahbah", "Hassi Fedoul", "Hassi Halifa",
                    "Messad", "Moudjebara", "Oum Laadham", "Sed Rahal",
                    "Selmana", "Sidi Baizid", "Sidi Ladjel", "Tadmit",
                    "Zaafrane", "Zaccar"
                ],
                Jijel: [
                    "Jijel", "Taher", "El Ancer", "Chekfa",
                    "Ziama Mansouriah", "Texenna", "Emir Abdelkader",
                    "El Milia", "Settara", "Kaous", "Ain El Kebira",
                    "Ain Errich", "Ain K'hair", "Ain Oulmene", "Ain Roua",
                    "Ain Z'hor", "Bordj T'har", "Boudria Beni Yadjis",
                    "Bouraoui Belhadef", "Chahna", "Chekfa", "Djemaa Beni Habibi",
                    "Djimla", "El Ancer", "El Aouana", "El Kennar Nouchfi",
                    "El Milia", "Emir Abdelkader", "Erraguene", "Ghebala",
                    "Jijel", "Kaous", "Kemir Oued Adjoul", "Oudjana",
                    "Ouled Rabah", "Ouled Yahia Khadrouch", "Settara",
                    "Sidi Abdelaziz", "Sidi Maarouf", "Taher", "Texenna",
                    "Ziama Mansouriah"
                ],
                Setif: [
                    "Setif", "Ain Arnat", "Ain Azel", "Ain Oulmene",
                    "Amoucha", "Babor", "Bouandas", "El Eulma",
                    "Hammam Guergour", "Hammam Souhna", "Ain Abessa",
                    "Ain El Kebira", "Ain Lahdjar", "Ain Legraj",
                    "Ain Oulmene", "Ain Roua", "Ain Sebt", "Ain Z'hor",
                    "Amoucha", "Babor", "Bazer Sakhra", "Beidha Bordj",
                    "Belaa", "Beni Aziz", "Beni Chebana", "Beni Fouda",
                    "Beni Hocine", "Beni Ourtilane", "Bir El Arch",
                    "Bir Haddada", "Bouandas", "Bougaa", "Bousselam",
                    "Boutaleb", "Dehamcha", "Djemila", "Draa Kebila",
                    "El Eulma", "El Ouricia", "Guellal", "Guelta Zerka",
                    "Hammam Guergour", "Hammam Souhna", "Harbil",
                    "Ksar El Abtal", "Maaouia", "Maoklane", "Mezloug",
                    "Ouled Addouane", "Ouled Sabor", "Ouled Si Ahmed",
                    "Ouled Tebben", "Rasfa", "Setif", "Tachouda",
                    "Talaifacene", "Taya", "Tella", "Tizi N'Bechar"
                ],
                Saida: [
                    "Saida", "Ain El Hadjar", "Youb", "Sidi Boubekeur",
                    "El Hassasna", "Ain Sekhouna", "Ouled Brahim",
                    "Maamora", "Sidi Ahmed", "Ain Soltane", "Doui Thabet",
                    "El Hassasna", "Hounet", "Moulay Larbi", "Ouled Khaled",
                    "Ouled Brahim", "Sidi Amar", "Sidi Boubekeur",
                    "Tircine", "Youb"
                ],
                Skikda: [
                    "Skikda", "Azzaba", "El Harrouch", "Ben Azzouz",
                    "Collo", "Tamalous", "Ouled Attia", "Zitouna",
                    "El Marsa", "Ramdane Djamel", "Ain Bouziane",
                    "Ain Charchar", "Ain Kechra", "Ain Zouit",
                    "Azzaba", "Ben Azzouz", "Beni Bechir", "Beni Oulbane",
                    "Beni Zid", "Bouchtata", "Cheraia", "Collo",
                    "Djendel Saadi Mohamed", "El Ghedir", "El Hadaiek",
                    "El Harrouch", "El Marsa", "Emdjez Edchich",
                    "Essebt", "Filfila", "Hamadi Krouma", "Kanoua",
                    "Kerkera", "Kheneg Mayoum", "Oued Zehour",
                    "Ouled Attia", "Ouled Hbaba", "Oum Toub",
                    "Ramdane Djamel", "Salah Bouchaour", "Sidi Mezghiche",
                    "Skikda", "Tamalous", "Zitouna"
                ],
                SidiBelAbbes: [
                    "Sidi Bel Abbes", "Tessala", "Sfisef", "Telagh",
                    "Mecheria", "Ras El Ma", "Ain Trid", "Mostefa Ben Brahim",
                    "Teghalimet", "Ben Badis", "Ain Adden", "Ain El Berd",
                    "Ain Kada", "Ain Thrid", "Ain Tindamine", "Amarnas",
                    "Badredine El Mokrani", "Belarbi", "Ben Badis",
                    "Benachiba Chelia", "Bir El Hammam", "Boudjebaa El Bordj",
                    "Boukhanafis", "Chetouane Belaila", "Dhaya",
                    "El Hacaiba", "Hassi Dahou", "Hassi Zehana",
                    "Lamtar", "M'Cid", "Makedra", "Marhoum", "Mecheria",
                    "Merine", "Mezaourou", "Mostefa Ben Brahim",
                    "Moulay Slissen", "Oued Sebaa", "Oued Sefioun",
                    "Oued Taourira", "Ras El Ma", "Redjem Demouche",
                    "Sehala Thaoura", "Sfisef", "Sidi Ali Benyoub",
                    "Sidi Ali Boussidi", "Sidi Bel Abbes", "Sidi Brahim",
                    "Sidi Chaib", "Sidi Dahou Dehors", "Sidi Hamadouche",
                    "Sidi Khaled", "Sidi Lahcene", "Sidi Yacoub",
                    "Tabia", "Tafissour", "Taoudmout", "Teghalimet",
                    "Telagh", "Teneira", "Tessala", "Tilmouni",
                    "Zerouala"
                ],
                Annaba: [
                    "Annaba", "El Bouni", "El Hadjar", "Berrahel",
                    "Seraidi", "Ain El Berda", "Chetaibi", "Treat",
                    "Oued El Aneb", "Ain Barbar", "Annaba", "Berrahel",
                    "Chetaibi", "El Bouni", "El Hadjar", "Eulma",
                    "Oued El Aneb", "Seraidi", "Treat", "Ain El Berda"
                ],
                Guelma: [
                    "Guelma", "Bouati Mahmoud", "Bou Hamdane", "Ain Makhlouf",
                    "Ain Reggada", "Bordj Sabat", "Hammam Debagh",
                    "Hammam N'Bails", "Oued Zenati", "Ras El Agba",
                    "Ain Ben Beida", "Ain Hessania", "Ain Larbi",
                    "Ain Reggada", "Ain Sandel", "Belkheir", "Ben Djarah",
                    "Beni Mezline", "Bordj Sabat", "Bou Hachana",
                    "Bou Hamdane", "Bouati Mahmoud", "Bouchegouf",
                    "Boumahra Ahmed", "Dahouara", "Djeballah Khemissi",
                    "El Fedjoudj", "Guelaat Bou Sbaa", "Guelma",
                    "Hammam Debagh", "Hammam Maskhoutine", "Hammam N'Bails",
                    "Hammam Nbail", "Heliopolis", "Kheraza", "Medjez Amar",
                    "Medjez Sfa", "Nechmaya", "Oued Cheham", "Oued Fragha",
                    "Oued Zenati", "Ras El Agba", "Roknia", "Sellaoua Announa",
                    "Tamlouka", "Taya"
                ],
                Constantine: [
                    "Constantine", "Hamma Bouziane", "Ibn Ziad",
                    "Zighoud Youcef", "El Khroub", "Ain Abid",
                    "Beni Hamiden", "Didouche Mourad", "Ouled Rahmou",
                    "Ain Smara", "Ben Badis", "Constantine", "Didouche Mourad",
                    "El Khroub", "Hamma Bouziane", "Ibn Ziad", "Mesaoud Boudjeriou",
                    "Ouled Rahmou", "Zighoud Youcef"
                ],
                Medea: [
                    "Medea", "Berrouaghia", "Ouzera", "Ksar El Boukhari",
                    "Ain Boucif", "El Omaria", "Souagui", "Tablat",
                    "Beni Slimane", "Seghouane", "Ain Boucif", "Aissaouia",
                    "Aziz", "Baata", "Benchicao", "Beni Slimane",
                    "Berrouaghia", "Boghar", "Bouaiche", "Bouaichoune",
                    "Bouchrahil", "Boughezoul", "Bouskene", "Chahbounia",
                    "Chellalet El Adhaoura", "Cheniguel", "Damiat",
                    "Derrag", "Djouab", "El Azizia", "El Guelbelkebir",
                    "El Hamdania", "El Omaria", "El Ouinet", "Hannacha",
                    "Kef Lakhdar", "Ksar El Boukhari", "Meftaha",
                    "Mezerana", "Mihoub", "Ouamri", "Oued Harbil",
                    "Ouled Antar", "Ouled Bouachra", "Ouled Deide",
                    "Ouled Hellal", "Ouled Maaref", "Oum El Djalil",
                    "Rebaia", "Saneg", "Sedraia", "Seghouane", "Sidi Demed",
                    "Sidi Damed", "Sidi Errabia", "Sidi Naamane",
                    "Sidi Zahar", "Sidi Ziane", "Souagui", "Tablat",
                    "Tafraout", "Tamesguida", "Tlatet Eddouair",
                    "Zoubiria"
                ],
                Mostaganem: [
                    "Mostaganem", "Ain Tedles", "Bouguirat", "Sidi Ali",
                    "Hassi Mameche", "Sour", "Mesra", "Ain Nouissy",
                    "Kheir Eddine", "Ain Boudinar", "Ain Nouissy",
                    "Ain Sidi Cherif", "Ain Tedles", "Benabdelmalek Ramdane",
                    "Bouguirat", "El Hassaine", "Fornaka", "Hadjadj",
                    "Hassi Mameche", "Kheir Eddine", "Mansourah",
                    "Mesra", "Mostaganem", "Nekmaria", "Oued El Kheir",
                    "Ouled Boughalem", "Ouled Maallah", "Safsaf",
                    "Sidi Ali", "Sidi Lakhdar", "Sirat", "Souaflia",
                    "Sour", "Stidia", "Tazgait", "Touahria"
                ],
                MSila: [
                    "M'Sila", "Maadid", "Hammam Dhalaa", "Ouled Derradj",
                    "Sidi Aissa", "Bou Saada", "Ain El Melh",
                    "Ouled Sidi Brahim", "Slim", "Ben Srour", "Ain El Melh",
                    "Ain Errich", "Ain Fares", "Ain Khadra", "Ain Lelou",
                    "Ain Oulmene", "Ain Temouchent", "Amoura", "Belaiba",
                    "Ben Srour", "Berhoum", "Bir Foda", "Bou Saada",
                    "Bouti Sayah", "Chellal", "Dehahna", "Djebel Messaad",
                    "El Hamel", "El Houamed", "Hammam Dhalaa", "Khettouti Sed El Djir",
                    "Khoubana", "Maadid", "M'Sila", "Magra", "M'tarfa",
                    "Medjedel", "Menaa", "Mohamed Boudiaf", "Ouanougha",
                    "Ouled Addi Guebala", "Ouled Atia", "Ouled Derradj",
                    "Ouled Madhi", "Ouled Mansour", "Ouled Sidi Brahim",
                    "Ouled Slimane", "Oultene", "Ras El Oued", "Sidi Aissa",
                    "Sidi Ameur", "Sidi Hadjeres", "Sidi M'Hamed",
                    "Slim", "Souamaa", "Tamsa", "Tarmount", "Zarzour",
                    "Zerarka"
                ],
                Mascara: [
                    "Mascara", "Bou Hanifia", "Tizi", "Hachem",
                    "El Gueitna", "Oggaz", "Mohammedia", "Sig",
                    "Zelameta", "Ghriss", "Ain Fares", "Ain Fekan",
                    "Ain Ferah", "Ain Fras", "Alaimia", "Aouf",
                    "Beniane", "Bou Hanifia", "Chorfa", "El Bordj",
                    "El Gaada", "El Gueitna", "El Keurt", "El Menaouer",
                    "Ferraguig", "Froha", "Gharrous", "Guerdjoum",
                    "Guittena", "Ghriss", "Hachem", "Khalouia",
                    "Makdha", "Mamounia", "Mascara", "Matemore",
                    "Mocta Douz", "Mohammedia", "Nesmoth", "Oggaz",
                    "Oued El Abtal", "Oued Taria", "Ras Ain Amirouche",
                    "Sedjerara", "Sehailia", "Sidi Abdeldjebar",
                    "Sidi Abdelmoumen", "Sidi Boussaid", "Sidi Kada",
                    "Sig", "Tighennif", "Tizi", "Zahana", "Zelameta"
                ],
                Ouargla: [
                    "Ouargla", "Ain Beida", "N'Goussa", "Hassi Messaoud",
                    "Rouissat", "Sidi Khouiled", "Tebesbest",
                    "El Hadjira", "Zaouia El Abidia", "Ain Beida",
                    "Benaceur", "Blidet Amor", "El Allia", "El Borma",
                    "El Hadjira", "El Hassi", "Hassi Ben Abdellah",
                    "Hassi Messaoud", "M'Naguer", "N'Goussa", "Nezla",
                    "Ouargla", "Rouissat", "Sidi Khouiled", "Sidi Slimane",
                    "Taibet", "Tebesbest", "Touggourt", "Zaouia El Abidia"
                ],
                Oran: [
                    "Oran", "Gdyel", "Bir El Djir", "Es Senia",
                    "Arzew", "Bethioua", "El Braya", "Ain Turk",
                    "Tafraoui", "Bousfer", "Ain Biya", "Ain Kerma",
                    "Ain Turk", "Arzew", "Ben Freha", "Bethioua",
                    "Boufatis", "Bousfer", "Boutlelis", "El Ancor",
                    "El Braya", "El Kerma", "Es Senia", "Gdyel",
                    "Hassi Bounif", "Hassi Ben Okba", "Hassi Mefsoukh",
                    "Mers El Kebir", "Misserghin", "Oran", "Oued Tlelat",
                    "Sidi Benyebka", "Sidi Chami", "Tafraoui",
                    "Touarga"
                ],
                ElBayadh: [
                    "El Bayadh", "Rogassa", "Brezina", "Ghassoul",
                    "Boualem", "El Abiodh Sidi Cheikh", "Ain El Orak",
                    "Arbaouat", "Bougtoub", "El Bnoud", "Ain El Orak",
                    "Arbaouat", "Boualem", "Bougtoub", "Boussemghoun",
                    "Brezina", "Cheguig", "Chellala", "El Abiodh Sidi Cheikh",
                    "El Bayadh", "El Bnoud", "Ghassoul", "Kef El Ahmar",
                    "Rogassa", "Sidi Ameur", "Sidi Slimane", "Sidi Tifour",
                    "Tousmouline"
                ],
                Illizi: [
                    "Illizi", "Djanet", "In Amenas", "Bordj Omar Driss",
                    "Debdeb", "In Amenas", "Illizi", "Djanet"
                ],
                BordjBouArreridj: [
                    "Bordj Bou Arreridj", "Ras El Oued", "Medjana",
                    "Mansoura", "El Main", "Bordj Zemoura", "Tixter",
                    "Djaafra", "Ain Taghrout", "Belimour", "Ain Tesra",
                    "Belimour", "Ben Daoud", "Bir Kasdali", "Bordj Bou Arreridj",
                    "Bordj Ghdir", "Bordj Zemoura", "Colla", "Djaafra",
                    "El Ach", "El Achir", "El Anseur", "El Main",
                    "El M'Hir", "Ghilassa", "Haraza", "Ksour",
                    "Mansoura", "Medjana", "Ouled Brahem", "Ouled Dahmane",
                    "Ouled Sidi Brahim", "Rabta", "Ras El Oued",
                    "Sidi Embarek", "Tafreg", "Taglait", "Teniet En Nasr",
                    "Tixter", "Tassamert", "Tefreg", "Teniet En Nasr",
                    "Tixter", "Zemoura"
                ],
                Boumerdes: [
                    "Boumerdes", "Boudouaou", "Isser", "Khemis El Khechna",
                    "Thenia", "Dellys", "Baghlia", "Bordj Menaiel",
                    "Naciria", "Corso", "Afir", "Ammal", "Baghlia",
                    "Ben Choud", "Beni Amrane", "Bordj Menaiel",
                    "Boudouaou", "Boudouaou El Bahri", "Boumerdes",
                    "Bouzegza Keddara", "Chabet El Ameur", "Corso",
                    "Dellys", "Djinet", "El Kharrouba", "Hammedi",
                    "Isser", "Khemis El Khechna", "Larbatache",
                    "Leghata", "Naciria", "Ouled Aissa", "Ouled Hedadj",
                    "Ouled Moussa", "Si Mustapha", "Sidi Daoud",
                    "Thenia", "Timezrit", "Zemmouri"
                ],
                ElTarf: [
                    "El Tarf", "Bouhadjar", "Ben M'Hidi", "Bouteldja",
                    "El Kala", "Ain El Assel", "Dréan", "Besbes",
                    "Zitouna", "Chebaita Mokhtar", "Ain El Assel",
                    "Ain Kerma", "Asfour", "Ben M'Hidi", "Besbes",
                    "Bouhadjar", "Bouteldja", "Chebaita Mokhtar",
                    "Chefia", "Chihani", "Dréan", "Echatt", "El Aioun",
                    "El Kala", "El Tarf", "Hammam Beni Salah",
                    "Lac Des Oiseaux", "Oued Zitoun", "Raml Souk",
                    "Souarekh", "Zerizer", "Zitouna"
                ],
                Tindouf: [
                    "Tindouf", "Oum El Assel", "Tindouf", "Oum El Assel"
                ],
                Tissemsilt: [
                    "Tissemsilt", "Bordj Bou Naama", "Theniet El Had",
                    "Lazharia", "Khemisti", "Ammari", "Bordj Emir Abdelkader",
                    "Ouled Bessem", "Lardjem", "Maacem", "Ammari",
                    "Bordj Bou Naama", "Bordj Emir Abdelkader",
                    "Boucaid", "Khemisti", "Larbaa", "Lardjem",
                    "Lazharia", "Maacem", "Melaab", "Ouled Bessem",
                    "Sidi Abed", "Sidi Boutouchent", "Sidi Lantri",
                    "Tadjena", "Taza", "Theniet El Had", "Tissemsilt",
                    "Youssoufia"
                ],
                ElOued: [
                    "El Oued", "Robbah", "Bayadha", "Debila",
                    "Hassi Khalifa", "Taleb Larbi", "Douar El Ma",
                    "Djamaa", "Mih Ouensa", "Kouinine", "Bayadha",
                    "Ben Guecha", "Debila", "Djamaa", "Douar El Ma",
                    "El Oued", "Guemar", "Hassi Khalifa", "Kouinine",
                    "Magrane", "Mih Ouensa", "M'Rara", "Nakhla",
                    "Oued El Alenda", "Oum Touyour", "Ourmes",
                    "Reguiba", "Robbah", "Sidi Amrane", "Sidi Aoun",
                    "Still", "Taghzout", "Taleb Larbi", "Tendla",
                    "Trifaoui"
                ],
                Khenchela: [
                    "Khenchela", "Kais", "Baghai", "Babar",
                    "Tamza", "Ouled Rechache", "El Hamma", "Ain Touila",
                    "Chelia", "Yabous", "Ain Touila", "Bab El Assa",
                    "Baghai", "Babar", "Bouhmama", "Chelia",
                    "Chechar", "Djellal", "El Hamma", "El Mahmal",
                    "Ensigha", "Fais", "Kais", "Khenchela",
                    "Khirane", "M'Sara", "M'Toussa", "Ouled Rechache",
                    "Remila", "Tamza", "Taouzianat", "Yabous"
                ],
                SoukAhras: [
                    "Souk Ahras", "Sedrata", "Hanancha", "M'Daourouche",
                    "Ouled Driss", "Tiffech", "Zaarouria", "Taoura",
                    "Drea", "Haddada", "Ain Zana", "Ain Soltane",
                    "Bir Bouhouche", "Drea", "Haddada", "Hanancha",
                    "Khedara", "M'Daourouche", "Mechroha", "Merahna",
                    "Oued Kebrit", "Ouled Driss", "Ouled Moumen",
                    "Oum El Adhaim", "Ragouba", "Safel El Ouiden",
                    "Sedrata", "Sidi Fredj", "Souk Ahras", "Taoura",
                    "Tiffech", "Zaarouria"
                ],
                Tipaza: [
                    "Tipaza", "Hadjar", "Sidi Amar", "Menaceur",
                    "Larhat", "Bou Ismail", "Ahmer El Ain", "Bourkika",
                    "Damous", "Fouka", "Aghbal", "Ahmer El Ain",
                    "Ain Tagourait", "Attatba", "Beni Milleuk",
                    "Bou Haroun", "Bou Ismail", "Bourkika", "Chaiba",
                    "Cherchell", "Damous", "Douaouda", "Fouka",
                    "Gouraya", "Hadjar", "Hadjout", "Khemisti",
                    "Larhat", "Menaceur", "Messelmoun", "Nador",
                    "Sidi Amar", "Sidi Ghiles", "Sidi Rached",
                    "Sidi Semiane", "Tipaza", "Zeralda"
                ],
                Mila: [
                    "Mila", "Ferdjioua", "Grarem Gouga", "Oued Endja",
                    "Telerghma", "Tadjenanet", "Bouhatem", "Rouached",
                    "Sidi Merouane", "Chelghoum Laid", "Ahmed Rachedi",
                    "Ain Beida Harriche", "Ain Mellouk", "Ain Tine",
                    "Amira Arras", "Bouhatem", "Chelghoum Laid",
                    "Derradji Bousselah", "El Mechira", "Ferdjioua",
                    "Grarem Gouga", "Hamala", "Mila", "Minar Zarza",
                    "Oued Endja", "Oued Seguen", "Ouled Khalouf",
                    "Rouached", "Sidi Khelifa", "Sidi Merouane",
                    "Tadjenanet", "Tassadane Haddada", "Telerghma",
                    "Terrai Bainen", "Tiberguent", "Yahia Beni Guecha",
                    "Zeghaia"
                ],
                AinDefla: [
                    "Ain Defla", "Miliana", "Bordj Emir Khaled",
                    "El Attaf", "El Amra", "Boumedfaa", "Hammam Righa",
                    "Djelida", "Ain Lechiakh", "Bathia", "Ain Benian",
                    "Ain Bouyahia", "Ain Defla", "Ain Lechiakh",
                    "Ain Soltane", "Ain Torki", "Arib", "Bathia",
                    "Belaas", "Ben Allal", "Bir Ould Khelifa",
                    "Bordj Emir Khaled", "Boumedfaa", "Bourached",
                    "Djelida", "Djemaa Ouled Cheikh", "El Abadia",
                    "El Amra", "El Attaf", "El Hassania", "El Maine",
                    "Hammam Righa", "Hoceinia", "Khemis Miliana",
                    "Mekhatria", "Miliana", "Oued Chorfa", "Oued Djemaa",
                    "Rouina", "Sidi Lakhdar", "Tacheta Zougagha",
                    "Tarik Ibn Ziad", "Tiberkanine", "Zeddine"
                ],
                Naama: [
                    "Naama", "Mecheria", "Ain Sefra", "Tiout",
                    "Sfissifa", "Moghrar", "Assela", "Djeniane Bourzeg",
                    "Ain Ben Khelil", "Ain Ben Khelil", "Ain Sefra",
                    "Assela", "Djeniane Bourzeg", "El Biod", "Kasdir",
                    "Mecheria", "Moghrar", "Naama", "Sfissifa",
                    "Tiout"
                ],
                AinTemouchent: [
                    "Ain Temouchent", "Chaabet El Ham", "Ain Kihal",
                    "Hammam Bou Hadjar", "Bou Zedjar", "Ouled Boudjemaa",
                    "Terga", "Ain Tolba", "El Malah", "Sidi Ben Adda",
                    "Ain El Arbaa", "Ain Kihal", "Ain Temouchent",
                    "Ain Tolba", "Aoulef", "Beni Saf", "Bou Zedjar",
                    "Chaabet El Ham", "Chentouf", "El Amria",
                    "El Emir Abdelkader", "El Malah", "El Messaid",
                    "Hammam Bou Hadjar", "Hassasna", "Hassi El Ghella",
                    "Oued Berkeche", "Oued Sabah", "Ouled Boudjemaa",
                    "Ouled Kihal", "Sidi Ben Adda", "Sidi Boumediene",
                    "Sidi Ouriache", "Terga"
                ],
                Ghardaia: [
                    "Ghardaia", "El Meniaa", "Zelfana", "Berriane",
                    "Metlili", "Sebseb", "Bounoura", "Hassi Fehal",
                    "El Guerrara", "Dhayet Bendhahoua", "Berriane",
                    "Bounoura", "Dhayet Bendhahoua", "El Atteuf",
                    "El Guerrara", "El Meniaa", "Ghardaia",
                    "Hassi Fehal", "Hassi Gara", "Metlili",
                    "Sebseb", "Zelfana"
                ],
                Relizane: [
                    "Relizane", "Bendaoud", "Oued Rhiou", "Zemmoura",
                    "Djidiouia", "El H'Madna", "Ammi Moussa",
                    "Mendes", "Ramka", "Sidi M'Hamed Ben Ali", "Ain Rahma",
                    "Ain Tarek", "Ammi Moussa", "Bendaoud",
                    "Beni Dergoun", "Beni Zentis", "Dar Ben Abdellah",
                    "Djidiouia", "El Guettar", "El H'Madna",
                    "El Matmar", "El Ouldja", "Had Echkalla",
                    "Kalaa", "Lahlef", "Mazouna", "Mediouna",
                    "Mendes", "Merdja Sidi Abed", "Ouarizane",
                    "Oued Essalem", "Oued Rhiou", "Ouled Aiche",
                    "Ouled Sidi Mihoub", "Ramka", "Relizane",
                    "Sidi Khettab", "Sidi Lazreg", "Sidi M'Hamed Ben Ali",
                    "Sidi M'Hamed Benaouda", "Sidi Saada", "Souk El Had",
                    "Yellel", "Zemmoura"
                ],
                
                   Timimoun: [
                    "Ouled Saïd",
                    "Aougrout",
                    "Talmine",
                    "Deldoul",
                    "Metarfa",
                    "Tinerkouk",
                    "Ksar Kaddour",
                    "Charouine",
                    "Ouled Aïssa"
                  ],
                  "Bordj Badji Mokhtar": [
                    "Bordj Badji Mokhtar",
                    "Timiaouine"
                  ],
                  "Ouled Djellal": [
                    "Ouled Djellal",
                    "Douis",
                    "Châaba",
                    "Sidi Khaled",
                    "Ras El Miaad",
                    "Besbes",
                    "Sidi Amrane",
                    "Zeribet El Oued"
                  ],
                  "Béni Abbès": [
                    "Béni Abbès",
                    "Tamtert",
                    "El Ouata",
                    "Kerzaz",
                    "Igli",
                    "Ouled Khoudir",
                    "Marhoum"
                  ],
                  "In Salah": [
                    "In Salah",
                    "Foggaret Ezzaouia"
                  ],
                  "In Guezzam": [
                    "In Guezzam",
                    "Tin Zaouatine"
                  ],
                  "Touggourt": [
                    "Touggourt",
                    "Nezla",
                    "Zaouia El Abidia",
                    "Sidi Slimane",
                    "Sidi Bouzid",
                    "Tebesbest",
                    "El Hadjira",
                    "El Allia",
                    "El Borma",
                    "M'Naguer",
                    "Taïbet",
                    "Tamacine",
                    "Benaceur"
                  ],
                  "Djanet": [
                    "Djanet",
                    "Bordj El Haouas"
                  ],
                  "El M'Ghair": [
                    "El M'Ghair",
                    "El Menia",
                    "Oum Touyour",
                    "Sidi Amrane",
                    "Still",
                    "Djamaa",
                    "Tenedla"
                  ],
                  "El Menia": [
                    "El Menia",
                    "Hassi Gara",
                    "Mansoura",
                    "Hassi Fehal"
                  ]

                // Add more wilayas and communes as needed
            };

            wilayaSelect.addEventListener('change', () => {
                if (wilayaSelect.value) {
                    communeSelect.disabled = false;
                    // Clear existing options
                    communeSelect.innerHTML = '<option value="">Select your commune</option>';

                    // Add communes for selected wilaya
                    if (communesData[wilayaSelect.value]) {
                        communesData[wilayaSelect.value].forEach(commune => {
                            const option = document.createElement('option');
                            option.value = commune;
                            option.textContent = commune;
                            communeSelect.appendChild(option);
                        });
                    }
                } else {
                    communeSelect.disabled = true;
                    communeSelect.innerHTML = '<option value="">Select your commune</option>';
                }
            });
        }

        // Form Submission
        const checkoutForm = document.getElementById('checkoutForm');

        if (checkoutForm) {
            checkoutForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const formData = new FormData(checkoutForm);
                const data = Object.fromEntries(formData.entries());

                // Add product info to form data
                data.product = localStorage.getItem('product');
                data.price = localStorage.getItem('price');
                data.quantity = document.getElementById('quantity').value;

                try {
                    // Send data to your email using FormSubmit.co
                    const response = await fetch('https://formsubmit.co/ajax/bznpowertech@gmail.com', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            ...data,
                            _subject: 'New Order from Enerza website',
                            _template: 'table'
                        })
                    });

                    if (response.ok) {
                        alert('Order placed successfully! We will contact you soon.');
                        // Clear localStorage
                        localStorage.removeItem('product');
                        localStorage.removeItem('price');
                        // Redirect to home page
                        window.location.href = 'index.html';
                    } else {
                        alert('An error occurred. Please try again later.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.');
                }
            });
        }
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Message sent successfully! We will contact you soon.');
                    contactForm.reset();
                } else {
                    alert('An error occurred. Please try again later.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    }

    // Language Switcher
    const languageBtns = document.querySelectorAll('.language-btn');
    const translations = {
        en: {
            home: "Home",
            categories: "Categories",
            products: "Products",
            about: "About Us",
            contact: "Contact",
            ourCategories: "Our Categories",
            explore: "Explore",
            allProducts: "All Products",
            aboutTitle: "About Enerza",
            contactInfo: "Contact Information",
            sendMessage: "Send Us a Message"
        },
        fr: {
            home: "Accueil",
            categories: "Catégories",
            products: "Produits",
            about: "À propos",
            contact: "Contact",
            ourCategories: "Nos Catégories",
            explore: "Explorer",
            allProducts: "Tous les Produits",
            aboutTitle: "À propos d'Enerza",
            contactInfo: "Informations de Contact",
            sendMessage: "Envoyez-nous un Message"
        },
        ar: {
            home: "الرئيسية",
            categories: "الفئات",
            products: "المنتجات",
            about: "معلومات عنا",
            contact: "اتصل بنا",
            ourCategories: "فئاتنا",
            explore: "استكشف",
            allProducts: "جميع المنتجات",
            aboutTitle: "حول إنرزا",
            contactInfo: "معلومات الاتصال",
            sendMessage: "أرسل لنا رسالة"
        }
    };

    if (languageBtns.length > 0) {
        languageBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');

                // Update active language button
                languageBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update all text elements with data-translate attribute
                document.querySelectorAll('[data-translate]').forEach(element => {
                    const key = element.getAttribute('data-translate');
                    if (translations[lang] && translations[lang][key]) {
                        element.textContent = translations[lang][key];
                    }
                });
            });
        });
    }
});