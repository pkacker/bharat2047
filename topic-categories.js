// Seven focused subtopics for each spoke, in the same order as TOPICS.
const CATEGORY_ROWS = {
en:`Scam calls|Strong passwords|OTP safety|Fake news|Safe payments|Reporting fraud|Digital privacy
Tax records|Return filing|Honest income|Bills and receipts|Deadlines|Public services|Expert advice
Local problems|New ideas|Skill sharing|Small experiments|Collaboration|Giving credit|Constructive feedback
Fair selection|Accessible spaces|Equal access|Hidden barriers|Inclusive learning|Fair hiring|Shared resources
Equal voice|Shared care work|Safety|Education|Workplace fairness|Stereotypes|Respect
Dignity at work|Fair wages|Service workers|Essential jobs|Workplace safety|Gratitude|Equal respect
Truthful reporting|Quality work|Promises|Admitting mistakes|Public trust|Fair credit|Accountability
Respectful speech|Social inclusion|Fair treatment|Shared spaces|Equal opportunity|Bias awareness|Dignity
Safety rules|Accurate records|Required forms|Professional duties|Reporting gaps|Timely action|Accountability
Girl child safety|Equal education|Health and care|Reject harmful taboos|Save water|Protect soil|Community support
Food waste|Waste separation|Battery disposal|E-waste|Repair and reuse|Collection points|Worker safety
Rooftop solar|Community solar|Energy saving|Safe installation|Maintenance|Clean power|Self-reliance
School attendance|Reading habits|Curiosity|Learning support|Creative skills|Equal education|Family encouragement
Interests and strengths|Vocational skills|Apprenticeships|New careers|Career guidance|Informed choices|Respect every path
No waste burning|Clean transport|Vehicle care|Neighbourhood air|Health impacts|Cleaner habits|Community action
Emergency calls|Safe assistance|First response|Making space|Helping others|Training|Act quickly
Know the law|Local rules|National rules|Other people's rights|Lawful complaints|Public safety|Fairness
Vaccine records|Trusted advice|Appointments|Public health|Misinformation|Community protection|Follow-up care
No littering|No spitting|Public toilets|Waste bins|Shared spaces|Hygiene|Civic care
Responsible honking|Quiet streets|Schools and hospitals|Neighbour respect|Volume control|Road safety|Peaceful spaces
Consent|Private photos|Personal data|Online sharing|Boundaries|Confidentiality|Respect
Mature trees|Tree care|Urban shade|Wildlife habitat|Responsible removal|New planting|Long-term care
Reusable bags|Refillable bottles|Less packaging|Sorting waste|Reuse|Single-use choices|Cleaner places
Respectful disagreement|No slurs|Words and harm|Apologies|Online civility|Identity and dignity|Listening`,
hi:`धोखाधड़ी वाले कॉल|मज़बूत पासवर्ड|ओटीपी सुरक्षा|झूठी खबरें|सुरक्षित भुगतान|धोखे की शिकायत|डिजिटल निजता
कर रिकॉर्ड|रिटर्न भरना|सही आय|बिल और रसीद|समय सीमा|सार्वजनिक सेवाएँ|विशेषज्ञ सलाह
स्थानीय समस्याएँ|नए विचार|कौशल बाँटना|छोटे प्रयोग|सहयोग|श्रेय देना|रचनात्मक राय
निष्पक्ष चयन|सुलभ स्थान|समान पहुँच|छिपी बाधाएँ|समावेशी शिक्षा|निष्पक्ष भर्ती|साझा संसाधन
बराबर आवाज़|घर का साझा काम|सुरक्षा|शिक्षा|कार्यस्थल पर न्याय|रूढ़ियाँ|सम्मान
काम की गरिमा|उचित वेतन|सेवा कर्मी|ज़रूरी पेशे|कार्यस्थल सुरक्षा|आभार|समान सम्मान
सच्ची रिपोर्ट|अच्छा काम|वादा निभाना|गलती मानना|सार्वजनिक भरोसा|निष्पक्ष श्रेय|जवाबदेही
सम्मानजनक भाषा|सामाजिक समावेश|निष्पक्ष व्यवहार|साझा स्थान|समान अवसर|भेदभाव पहचानें|गरिमा
सुरक्षा नियम|सही रिकॉर्ड|ज़रूरी फॉर्म|कामकाजी दायित्व|कमी बताना|समय पर कदम|जवाबदेही
बालिका सुरक्षा|समान शिक्षा|स्वास्थ्य और देखभाल|हानिकारक मान्यताएँ|जल बचाना|मिट्टी बचाना|समुदाय का साथ
खाद्य कचरा|कचरा अलग करना|बैटरी निपटान|ई-कचरा|मरम्मत और पुनः उपयोग|संग्रह केंद्र|कर्मियों की सुरक्षा
छत पर सौर ऊर्जा|साझा सौर ऊर्जा|बिजली बचत|सुरक्षित स्थापना|देखभाल|स्वच्छ बिजली|आत्मनिर्भरता
स्कूल उपस्थिति|पढ़ने की आदत|जिज्ञासा|पढ़ाई में मदद|रचनात्मक कौशल|समान शिक्षा|परिवार का प्रोत्साहन
रुचि और क्षमता|व्यावसायिक कौशल|प्रशिक्षण|नए कैरियर|मार्गदर्शन|सोच-समझकर चयन|हर रास्ते का सम्मान
कचरा न जलाएँ|स्वच्छ परिवहन|वाहन की देखभाल|पड़ोस की हवा|स्वास्थ्य पर असर|स्वच्छ आदतें|सामुदायिक कदम
आपात कॉल|सुरक्षित मदद|पहली प्रतिक्रिया|रास्ता देना|दूसरों की मदद|प्रशिक्षण|तुरंत कदम
कानून जानें|स्थानीय नियम|राष्ट्रीय नियम|दूसरों के अधिकार|वैध शिकायत|सार्वजनिक सुरक्षा|निष्पक्षता
टीकाकरण रिकॉर्ड|विश्वसनीय सलाह|मुलाकात का समय|सार्वजनिक स्वास्थ्य|गलत जानकारी|समुदाय की सुरक्षा|आगे की देखभाल
कूड़ा न फैलाएँ|थूकें नहीं|सार्वजनिक शौचालय|कूड़ेदान|साझा स्थान|स्वच्छता|नागरिक देखभाल
संयमित हॉर्न|शांत सड़कें|स्कूल और अस्पताल|पड़ोसियों का सम्मान|आवाज़ नियंत्रण|सड़क सुरक्षा|शांत स्थान
सहमति|निजी तस्वीरें|व्यक्तिगत जानकारी|ऑनलाइन साझा करना|सीमाएँ|गोपनीयता|सम्मान
बड़े पेड़|पेड़ों की देखभाल|शहरी छाया|जीवों का आवास|सोचकर कटाई|नए पौधे|लंबी देखभाल
दोबारा उपयोग के थैले|भरने योग्य बोतलें|कम पैकिंग|कचरा छाँटना|पुनः उपयोग|एकबारगी वस्तुएँ|स्वच्छ स्थान
सम्मानजनक असहमति|गाली से बचें|शब्दों का असर|माफ़ी|ऑनलाइन शिष्टता|पहचान और गरिमा|ध्यान से सुनना`,
ur:`دھوکے کی کالیں|مضبوط پاس ورڈ|او ٹی پی حفاظت|جھوٹی خبریں|محفوظ ادائیگی|دھوکے کی اطلاع|ڈیجیٹل رازداری
ٹیکس ریکارڈ|گوشوارہ جمع کرنا|درست آمدنی|بل اور رسیدیں|وقت کی پابندی|عوامی خدمات|ماہر کی رائے
مقامی مسائل|نئے خیالات|ہنر بانٹنا|چھوٹے تجربے|تعاون|کریڈٹ دینا|تعمیری رائے
منصفانہ انتخاب|قابل رسائی جگہ|برابر رسائی|پوشیدہ رکاوٹیں|شامل تعلیم|منصفانہ بھرتی|مشترکہ وسائل
برابر آواز|گھر کا مشترکہ کام|حفاظت|تعلیم|کام کی جگہ پر انصاف|روایتی تصورات|احترام
کام کا وقار|مناسب اجرت|خدمت کرنے والے|ضروری پیشے|کام کی جگہ حفاظت|شکریہ|برابر احترام
سچی رپورٹ|معیاری کام|وعدہ نبھانا|غلطی ماننا|عوامی اعتماد|منصفانہ کریڈٹ|جوابدہی
باادب زبان|سماجی شمولیت|منصفانہ سلوک|مشترکہ جگہ|برابر موقع|تعصب کی پہچان|وقار
حفاظتی اصول|درست ریکارڈ|ضروری فارم|پیشہ ورانہ ذمہ داری|کمی کی اطلاع|بروقت عمل|جوابدہی
بچی کی حفاظت|برابر تعلیم|صحت اور نگہداشت|نقصان دہ رسمیں|پانی بچانا|مٹی بچانا|برادری کی مدد
خوراک کا کچرا|کچرا الگ کرنا|بیٹری کی تلفی|برقی کچرا|مرمت اور دوبارہ استعمال|جمع کرنے کے مراکز|کارکنوں کی حفاظت
چھت کی شمسی توانائی|مشترکہ شمسی توانائی|بجلی بچانا|محفوظ تنصیب|دیکھ بھال|صاف بجلی|خود کفالت
اسکول حاضری|مطالعے کی عادت|تجسس|سیکھنے میں مدد|تخلیقی ہنر|برابر تعلیم|گھر کی حوصلہ افزائی
دلچسپی اور صلاحیت|فنی ہنر|تربیت|نئے پیشے|رہنمائی|سوچ سمجھ کر انتخاب|ہر راستے کی عزت
کچرا نہ جلائیں|صاف سواری|گاڑی کی دیکھ بھال|محلے کی ہوا|صحت پر اثر|صاف عادتیں|مشترکہ قدم
ہنگامی کال|محفوظ مدد|ابتدائی ردعمل|راستہ دینا|دوسروں کی مدد|تربیت|فوراً عمل
قانون جانیں|مقامی اصول|قومی اصول|دوسروں کے حقوق|جائز شکایت|عوامی حفاظت|انصاف
ٹیکوں کا ریکارڈ|معتبر مشورہ|ملاقات کا وقت|عوامی صحت|غلط معلومات|برادری کی حفاظت|بعد کی دیکھ بھال
کچرا نہ پھیلائیں|تھوکیں نہیں|عوامی بیت الخلا|کچرے کے ڈبے|مشترکہ جگہیں|صفائی|شہری خیال
ذمہ دار ہارن|پرسکون سڑکیں|اسکول اور اسپتال|پڑوسیوں کا احترام|آواز کی حد|سڑک کی حفاظت|پرسکون جگہ
رضامندی|نجی تصویریں|ذاتی معلومات|آن لائن بانٹنا|حدود|رازداری|احترام
پرانے درخت|درختوں کی دیکھ بھال|شہری سایہ|جانداروں کا مسکن|سوچ کر کٹائی|نئے پودے|مسلسل دیکھ بھال
دوبارہ استعمال کا تھیلا|دوبارہ بھرنے والی بوتل|کم پیکنگ|کچرا چھانٹنا|دوبارہ استعمال|یک بارہ چیزیں|صاف جگہیں
باادب اختلاف|گالی سے بچیں|الفاظ کا اثر|معافی|آن لائن شائستگی|شناخت اور وقار|غور سے سننا`
};
const TOPIC_CATEGORIES = Object.fromEntries(Object.entries(CATEGORY_ROWS).map(([language,rows])=>[language,rows.trim().split('\n').map(row=>row.split('|'))]));
function categoriesFor(index){return TOPIC_CATEGORIES[appLanguage()][index]}
