document.addEventListener('DOMContentLoaded', function() {
    const vocabCard = document.getElementById('vocabCard');
    const kanjiElement = document.getElementById('kanji');
    const furiganaElement = document.getElementById('furigana');
    const meaningElement = document.getElementById('meaning');
    const audioElement = document.getElementById('audio');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const favoriteBtn = document.getElementById('favoriteBtn');
    const viewFavoritesBtn = document.getElementById('viewFavoritesBtn');
    const aboutBtn = document.getElementById('aboutBtn');
    const removeBtn = document.getElementById('removeBtn');
    const favKanjiElement = document.getElementById('favKanji');
    const favFuriganaElement = document.getElementById('favFurigana');
    const favMeaningElement = document.getElementById('favMeaning');
    const favAudioElement = document.getElementById('favAudio');
    const noFavoritesMessage = document.getElementById('noFavorites');

    let currentIndex = 0;
    let favoriteIndex = 0;
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let showingFavorites = false;
    let showingAbout = false;

   
    
    
    // The jlpt n5 vocabulary was divided into seven groups but I did not complete them
    const vocabList = [

        // G1

        {kanji: "ああ", furigana: "ああ", meaning: "آه!, أوه!"},
        {kanji: "会う", furigana: "あう", meaning: " يُقَابِلُ (شَخْصَاً)، يَلْتَقِي (بِشَخْصٍ)"},
        {kanji: "青", furigana: "あお", meaning: "اللَّوْنُ الأَزْرَق، زُرْقَة"},
        {kanji: "赤", furigana: "あか", meaning: "اللَّوْنُ الأَحْمَر، حُمْرَة"},
        {kanji: "明るい", furigana: "あかるい", meaning: " مضيء، مشرق"},
        {kanji: "秋", furigana: "あき", meaning: "خريف (فصل)"},
        {kanji: "開く", furigana: "あく", meaning: "يفتح، يصبح مفتوحاً"},
        {kanji: "上げる", furigana: "あげる", meaning: "يَرْفَعُ، يُعَلِّي، يُرَقِّي "},
        {kanji: "朝", furigana: "あさ", meaning: "صباح"},
        {kanji: "朝御飯", furigana: "あさごはん", meaning: "فطور"},
        {kanji: "明後日", furigana: "あさって", meaning: "بعد غد"},
        {kanji: "足", furigana: "あし", meaning: "قَدَم (الانسان)، رِجْل (الطاولة)، ساق، طرف (الحيوان) "},
        {kanji: "明日", furigana: "あした", meaning: "غد"},
        {kanji: "あそこ", furigana: "あそこ", meaning: "هُنَالِكَ، ذَلِكَ المَكَان"},
        {kanji: "遊ぶ", furigana: "あそぶ", meaning: "يَلعَب، يَلهو، يَتَسَلَّى"},
        {kanji: "暖かい", furigana: "あたたかい", meaning: "دافئ"},
        {kanji: "頭", furigana: "あたま", meaning: "رأس"},
        {kanji: "新しい", furigana: "あたらしい", meaning: "جديد"},
        {kanji: "暑い", furigana: "あつい", meaning: "حار (بالنسبة للطقس)، دافئ"},
        {kanji: "熱い", furigana: "あつい", meaning: "حار (الأشياء)"},
        {kanji: "厚い", furigana: "あつい", meaning: " سميك، ثخين، غليظ"},
        {kanji: "あっち", furigana: "あっち", meaning: "صيغة مختزلة وعاميّة لـِ あちら"},
        {kanji: "後", furigana: "あと", meaning: "فيما بعد؛ في المستقبل؛ البقية؛ منذ ذلك الحين"},
        {kanji: "あなた", furigana: "あなた", meaning: "أنتَ، أنتِ / عزيزي"}, // وصلت هنا !!!!
        {kanji: "兄", furigana: "あに", meaning: "أخي الأكبر (بتواضع)"},
        {kanji: "姉", furigana: "あね", meaning: "أختي الكبرى (بتواضع)"},
        {kanji: "アパート", furigana: "アパート", meaning: "شقة"},
        {kanji: "あの", furigana: "あの", meaning: " ذَلِكَ، ذاكَ، تِلْكَ، تِيكَ، أولئكَ, ممم..."},
        {kanji: "浴びる", furigana: "あびる", meaning: "يَغتسل، يَستحمّ، يسكب (الماء) على جسمه"},
        {kanji: "危ない", furigana: "あぶない", meaning: "خطر، حرج"},
        {kanji: "甘い", furigana: "あまい", meaning: "حُلو المذاق, (صوت) عَذْب، حُلو"},
        {kanji: "余り", furigana: "あまり", meaning: "بقية، الباقي، الجزء الباقي، ما تبقى، بقايا (الطعام)، فائض"},
        {kanji: "雨", furigana: "あめ", meaning: "مَطَر"},
        {kanji: "飴", furigana: "あめ", meaning: "حلوى (صلبة)"},
        {kanji: "洗う", furigana: "あらう", meaning: " يَغسِل (وجهه)، يُحمِّم (الطفل)، يَجلي (الصحون)، يُنظِّف (الجرح بمعقّم)"},
        {kanji: "在る", furigana: "ある", meaning: "يكون، يعيش, يوجد"},
        {kanji: "歩く", furigana: "あるく", meaning: "يَمشي، يَسير، يَسعى، يَسلك"},
        {kanji: "あれ", furigana: "あれ", meaning: "ذلك (هناك)"},
        {kanji: "いい", furigana: "いい; よい", meaning: "جيد"},
        {kanji: "いいえ", furigana: "いいえ", meaning: "لا، لا على الإطلاق"},
        {kanji: "言う", furigana: "いう", meaning: "يَقُولُ، يَنْطِقُ، يُعْرِبُ (عَنْ)، يُعَبِّرُ (عَنْ)"},
        {kanji: "家", furigana: "いえ", meaning: " بَيْت، منزل، دار، مسكن، مأوى"},
        {kanji: "いかが", furigana: "いかが", meaning: "كيف، بأي طريقة"},
        {kanji: "行く", furigana: "いく; ゆく", meaning: "يذهب"},
        {kanji: "いくつ", furigana: "いくつ", meaning: "كم, للتعبير عن عدد الأشياء، ولا يستعمَل مع الكائنات الحية."},
        {kanji: "いくら", furigana: "いくら", meaning: "كم ثمن "},
        {kanji: "池", furigana: "いけ", meaning: "بركة (ماء)"},
        {kanji: "医者", furigana: "いしゃ", meaning: "طبيب، دكتور،"},
        {kanji: "椅子", furigana: "いす", meaning: "كُرْسِي"},
        {kanji: "忙しい", furigana: "いそがしい", meaning: "مشغول (الأشخاص، الأيام)"},
        {kanji: "痛い", furigana: "いたい", meaning: "مؤلم؛ مؤلم؛ مسبب للألم"},
        {kanji: "一", furigana: "いち", meaning: "واحد"},
        {kanji: "一日", furigana: "いちにち", meaning: "اليوم الأوَّل (من الشهر)"},
        {kanji: "一番", furigana: "いちばん", meaning: "أفضل (الأكثر)، الأول، الرقم واحد"},
        {kanji: "いつ", furigana: "いつ", meaning: "مَتى"},
        {kanji: "五日", furigana: "いつか", meaning: "خمسة أيام؛ اليوم الخامس من الشهر"},
        {kanji: "一緒", furigana: "いっしょ", meaning: "معاً"},
        {kanji: "五つ", furigana: "いつつ", meaning: "خمسة أشياء"},
        {kanji: "いつも", furigana: "いつも", meaning: "دائماً، عادةً، كل مرة، أبداً (مع الفعل السلبي)"},
        {kanji: "犬", furigana: "いぬ", meaning: "كلب"},
        {kanji: "今", furigana: "いま", meaning: "الآن"},
        {kanji: "意味", furigana: "いみ", meaning: "معنى، دلالة"},
        {kanji: "妹", furigana: "いもうと", meaning: "أخت أصغر (بتواضع)"},
        {kanji: "嫌", furigana: "いや", meaning: "غير مرغوب، بغيض، مزعج"},
        {kanji: "入口", furigana: "いりぐち", meaning: "مدخل"},
        {kanji: "居る", furigana: "いる", meaning: "(بتواضع) يكون (للكائنات الحية)، يوجد"},
        {kanji: "要る", furigana: "いる", meaning: "يَحتاج"},
        {kanji: "入れる", furigana: "いれる", meaning: "يضع في"},
        {kanji: "色", furigana: "いろ", meaning: "لون"},
        {kanji: "色々", furigana: "いろいろ", meaning: " متنوع، متعدد، شتى، مُختلَف"},
        {kanji: "上", furigana: "うえ", meaning: "فوق (أعلى، إلخ)، فوق، على"},
        {kanji: "後ろ", furigana: "うしろ", meaning: " وَراء، خَلْف"},
        {kanji: "薄い", furigana: "うすい", meaning: " رفيع، نحيل، قليل السماكة"},
        {kanji: "歌", furigana: "うた", meaning: "أغنية"},
        {kanji: "歌う", furigana: "うたう", meaning: "يغني"},
        {kanji: "うち", furigana: "うち", meaning: "  داخِل، الداخِل "},
        {kanji: "生まれる", furigana: "うまれる", meaning: " يُولَد "},
        {kanji: "海", furigana: "うみ", meaning: "بحر، شاطئ"},
        {kanji: "売る", furigana: "うる", meaning: "يبيع"},
        {kanji: "うるさい", furigana: "うるさい", meaning: "مزعج"},
        {kanji: "上着", furigana: "うわぎ", meaning: "معطف، سترة"},
        {kanji: "絵", furigana: "え", meaning: "لوحة؛ صورة؛ رسم"},
        {kanji: "映画", furigana: "えいが", meaning: " فيلم"},
        {kanji: "映画館", furigana: "えいがかん", meaning: "دار السينما"},
        {kanji: "英語", furigana: "えいご", meaning: "اللغة الإنجليزية"},
        {kanji: "ええ", furigana: "ええ", meaning: "نعم"},
        {kanji: "駅", furigana: "えき", meaning: "محطة قطار"},
        {kanji: "エレベーター", furigana: "エレベーター", meaning: "مصعد"},
        {kanji: "～円", furigana: "～えん", meaning: "ين (عملة)"},
        {kanji: "鉛筆", furigana: "えんぴつ", meaning: "قلم رصاص"},
        {kanji: "お～", furigana: "お～", meaning: "بادئة تكريمية تأتي في بداية بعض الأسماء"},
        {kanji: "美味しい", furigana: "おいしい", meaning: "لذيذ، شهي"},
        {kanji: "多い", furigana: "おおい", meaning: "كبير (في العدد أو الكمية)"},
        {kanji: "大きい", furigana: "おおきい", meaning: " كَبِير، جَسِيم، ضَخْم، (طموح) عَظِيم"},
        {kanji: "大きな", furigana: "おおきな", meaning: "كبير"},



        // G2
        {kanji: "大勢", furigana: "おおぜい", meaning: "عدد كبير من الناس"},
        {kanji: "お母さん", furigana: "おかあさん", meaning: "الأم (رسمياً)"},
        {kanji: "お菓子", furigana: "おかし", meaning: "حلويات، وجبة خفيفة"},
        {kanji: "お金", furigana: "おかね", meaning: "المال"},
        {kanji: "起きる", furigana: "おきる", meaning: "ينهض (من سقوطه أو من وضعية الاستلقاء) "},
        {kanji: "置く", furigana: "おく", meaning: "يضع؛ يضع في مكان"},
        {kanji: "奥さん", furigana: "おくさん", meaning: "زوجة، قرينة"},
        {kanji: "お酒", furigana: "おさけ", meaning: "ساكي؛ خمر الأرز الياباني"},
        {kanji: "お皿", furigana: "おさら", meaning: "طبق، صحن"},
        {kanji: "伯父", furigana: "おじさん", meaning: "العم، الرجل في منتصف العمر"},
        {kanji: "おじいさん", furigana: "おじいさん", meaning: "الجد، رجل مُسِنّ"},
        {kanji: "教える", furigana: "おしえる", meaning: "يُعلِّم، يُدَرِّس"},
        {kanji: "押す", furigana: "おす", meaning: "يضغط، يدفع"},
        {kanji: "遅い", furigana: "おそい", meaning: "بطيء؛ متأخر"},
        {kanji: "お茶", furigana: "おちゃ", meaning: "شاي بشكل عام إلا أنها عادةً ما تشير إلى الشاي الأخضر"},
        {kanji: "お手洗い", furigana: "おてあらい", meaning: "مرحاض، حمام"},
        {kanji: "お父さん", furigana: "おとうさん", meaning: "الأب (رسمياً)"},
        {kanji: "弟", furigana: "おとうと", meaning: "الأخ الأصغر"},
        {kanji: "男", furigana: "おとこ", meaning: "رجل"},
        {kanji: "男の子", furigana: "おとこのこ", meaning: "صبي"},
        {kanji: "一昨日", furigana: "おととい", meaning: "قبل أمس"},
        {kanji: "大人", furigana: "おとな", meaning: "راشِد، ناضِج"},
        {kanji: "お腹", furigana: "おなか", meaning: "بَطْن، مَعِدة"},
        {kanji: "同じ", furigana: "おなじ", meaning: "مماثل ,نفس الشيء"},
        {kanji: "お姉さん", furigana: "おねえさん", meaning: "الأخت الكبرى (احتراماً)"},
        {kanji: "おばあさん", furigana: "おばあさん", meaning: "الجدة، السيدة الكبيرة"},
        {kanji: "お弁当", furigana: "おべんとう", meaning: "وجبة غداء في علبة"},
        {kanji: "覚える", furigana: "おぼえる", meaning: "يتعلم، يتذكّر"},
        {kanji: "おまわりさん", furigana: "おまわりさん", meaning: "شرطي (تعبير ودي)"},
        {kanji: "重い", furigana: "おもい", meaning: "ثقيل؛ جاد"},
        {kanji: "面白い", furigana: "おもしろい", meaning: "ممتع، مسلٍ"},
        {kanji: "泳ぐ", furigana: "およぐ", meaning: "يسبح"},
        {kanji: "降りる", furigana: "おりる", meaning: " يَنزِل، يَهبِط"},
        {kanji: "終わる", furigana: "おわる", meaning: "ينتهي"},
        {kanji: "音楽", furigana: "おんがく", meaning: "موسيقى"},
        {kanji: "女", furigana: "おんな", meaning: "امرأة"},
        {kanji: "女の子", furigana: "おんなのこ", meaning: "فتاة"},
        {kanji: "外国", furigana: "がいこく", meaning: "بلد أجنبي؛ الخارج"},
        {kanji: "会社", furigana: "かいしゃ", meaning: "شركة، مؤسسة"},
        {kanji: "階段", furigana: "かいだん", meaning: "درج"},
        {kanji: "買い物", furigana: "かいもの", meaning: "تسوق"},
        {kanji: "買う", furigana: "かう", meaning: "يشتري"},
        {kanji: "帰る", furigana: "かえる", meaning: "يعود، يرجع"},
        {kanji: "顔", furigana: "かお", meaning: "وجه"},
        {kanji: "鍵", furigana: "かぎ", meaning: "قفل؛ مفتاح"},
        {kanji: "書く", furigana: "かく", meaning: "يكتب"},
        {kanji: "学生", furigana: "がくせい", meaning: "طالب"},
        {kanji: "掛ける", furigana: "かける", meaning: "يرتدي (نظارات)؛ يعلق (على الحائط)"},
        {kanji: "傘", furigana: "かさ", meaning: "مظلة"},
        {kanji: "貸す", furigana: "かす", meaning: "يُعِير، يُقرِض"},
        {kanji: "風", furigana: "かぜ", meaning: "ريح، نسيم"},
        {kanji: "風邪", furigana: "かぜ", meaning: "برد، إنفلونزا"},
        {kanji: "家族", furigana: "かぞく", meaning: "عائلة"},
        {kanji: "片仮名", furigana: "かたかな", meaning: "كاتاكانا"},
        {kanji: "学校", furigana: "がっこう", meaning: "مدرسة"},
        {kanji: "カップ", furigana: "カップ", meaning: "كوب"},
        {kanji: "角", furigana: "かど", meaning: "زاوية"},
        {kanji: "かばん", furigana: "かばん", meaning: "حقيبة"},
        {kanji: "花瓶", furigana: "かびん", meaning: "مزهرية"},
        {kanji: "かぶる", furigana: "かぶる", meaning: "يرتدي (قبعة)"},
        {kanji: "紙", furigana: "かみ", meaning: "ورق"},
        {kanji: "カメラ", furigana: "カメラ", meaning: "كاميرا"},
        {kanji: "火曜日", furigana: "かようび", meaning: "الثلاثاء"},
        {kanji: "体", furigana: "からだ", meaning: "جسم؛ صحة"},
        {kanji: "借りる", furigana: "かりる", meaning: "يستعير، يقترض"},
        {kanji: "カレー", furigana: "カレー", meaning: "كاري (طعام)"},
        {kanji: "カレンダー", furigana: "カレンダー", meaning: "تقويم"},
        {kanji: "川", furigana: "かわ", meaning: "نهر"},
        {kanji: "漢字", furigana: "かんじ", meaning: "كانجي؛ حرف صيني"},
        {kanji: "木", furigana: "き", meaning: "شجرة؛ خشب"},
        {kanji: "黄色", furigana: "きいろ", meaning: "أصفر"},
        {kanji: "消える", furigana: "きえる", meaning: "مسح، شطب / إطفاء، انطفاء / اختفاء"},
        {kanji: "北", furigana: "きた", meaning: "الشَّمَال "},
        {kanji: "ギター", furigana: "ギター", meaning: "قيثارة"},
        {kanji: "汚い", furigana: "きたない", meaning: "قذر، غير نظيف"},
        {kanji: "喫茶店", furigana: "きっさてん", meaning: "مقهى"},
        {kanji: "切手", furigana: "きって", meaning: "طوابع بريدية"},
        {kanji: "切符", furigana: "きっぷ", meaning: "تذكرة"},



        // G3
        // G4
        // G5
        // G6
        // G7


      ];

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function loadVocab(index) {
      const vocab = vocabList[index];
      kanjiElement.textContent = vocab.kanji;
      furiganaElement.textContent = vocab.furigana;
      meaningElement.textContent = vocab.meaning;
      meaningElement.style.display = 'none';

      const encodedKanji = encodeURIComponent(vocab.kanji);
      const forvoUrl = `https://forvo.com/word/${encodedKanji}/#ja`;

      audioElement.innerHTML = `<a href="${forvoUrl}" target="_blank">استمع للكلمة على فورفو</a>`;
    }

    function loadFavorite(index) {
      const vocab = favorites[index];
      favKanjiElement.textContent = vocab.kanji;
      favFuriganaElement.textContent = vocab.furigana;
      favMeaningElement.textContent = vocab.meaning;
      favMeaningElement.style.display = 'none';

      const encodedKanji = encodeURIComponent(vocab.kanji);
      const forvoUrl = `https://forvo.com/word/${encodedKanji}/#ja`;

      favAudioElement.innerHTML = `<a href="${forvoUrl}" target="_blank">استمع للكلمة على فورفو</a>`;
    }

    function getRandomIndex() {
      return Math.floor(Math.random() * vocabList.length);
    }

    function addFavorite() {
      const vocab = vocabList[currentIndex];
      if (!favorites.find(fav => fav.kanji === vocab.kanji)) {
        favorites.push(vocab);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert("تمت الإضافة إلى المفضلة!");
      } else {
        alert("الكلمة موجودة بالفعل في المفضلة!");
      }
    }

    function removeFavorite() {
      const vocab = favorites[favoriteIndex];
      const index = favorites.findIndex(fav => fav.kanji === vocab.kanji);
      if (index !== -1) {
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        if (favorites.length > 0) {
          favoriteIndex = favoriteIndex % favorites.length;
          loadFavorite(favoriteIndex);
        } else {
          favoriteIndex = 0;
          favKanjiElement.textContent = "";
          favFuriganaElement.textContent = "";
          favMeaningElement.textContent = "";
          favAudioElement.innerHTML = "";
          noFavoritesMessage.style.display = 'block';
        }
      }
    }

    function toggleFavorites() {
      showingFavorites = !showingFavorites;
      showingAbout = false;
      document.querySelector('.card-about').style.display = 'none';
      if (showingFavorites) {
        vocabCard.classList.add('flip');
        if (favorites.length > 0) {
          loadFavorite(favoriteIndex);
          noFavoritesMessage.style.display = 'none';
        } else {
          noFavoritesMessage.style.display = 'block';
        }
      } else {
        vocabCard.classList.remove('flip');
        noFavoritesMessage.style.display = 'none';
      }
    }

    function toggleAbout() {
      showingAbout = !showingAbout;
      showingFavorites = false;
      noFavoritesMessage.style.display = 'none';
      if (showingAbout) {
        vocabCard.classList.add('flip');
        document.querySelector('.card-about').style.display = 'block';
      } else {
        vocabCard.classList.remove('flip');
        document.querySelector('.card-about').style.display = 'none';
      }
    }

    vocabCard.addEventListener('click', function() {
      if (!showingFavorites && !showingAbout) {
        meaningElement.style.display = meaningElement.style.display === 'none' ? 'block' : 'none';
      } else if (showingFavorites) {
        favMeaningElement.style.display = favMeaningElement.style.display === 'none' ? 'block' : 'none';
      }
    });

    nextBtn.addEventListener('click', function() {
      if (!showingFavorites && !showingAbout) {
        currentIndex = (currentIndex + 1) % vocabList.length;
        loadVocab(currentIndex);
      } else if (showingFavorites && favorites.length > 0) {
        favoriteIndex = (favoriteIndex + 1) % favorites.length;
        loadFavorite(favoriteIndex);
      }
    });

    prevBtn.addEventListener('click', function() {
      if (!showingFavorites && !showingAbout) {
        currentIndex = (currentIndex - 1 + vocabList.length) % vocabList.length;
        loadVocab(currentIndex);
      } else if (showingFavorites && favorites.length > 0) {
        favoriteIndex = (favoriteIndex - 1 + favorites.length) % favorites.length;
        loadFavorite(favoriteIndex);
      }
    });

    favoriteBtn.addEventListener('click', addFavorite);
    viewFavoritesBtn.addEventListener('click', toggleFavorites);
    aboutBtn.addEventListener('click', toggleAbout);
    removeBtn.addEventListener('click', removeFavorite);

    shuffle(vocabList); 
    loadVocab(currentIndex);
    if (favorites.length > 0) {
      noFavoritesMessage.style.display = 'none';
    } else {
      noFavoritesMessage.style.display = 'block';
    }
});
