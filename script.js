document.addEventListener('DOMContentLoaded', function() {
    
    // إخفاء شريط التحميل
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('loader').classList.add('fade-out');
        }, 500);
    });

    // تأثير الظهور عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.section-title, .service-card, .project-card, .stat-item, .faq-item, .about-text, .about-image');
    elementsToReveal.forEach(el => {
        observer.observe(el);
    });

    // عداد الإحصائيات المتحرك
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.textContent = target + '+';
                        }
                    };
                    updateCounter();
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // تفاعل بطاقات الخدمات
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });

    // فلترة المشاريع
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة active من جميع الأزرار
            filterBtns.forEach(b => b.classList.remove('active'));
            // إضافة active للزر المضغوط
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category.includes(filter)) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.display = 'block';
                    }, 10);
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // زر "اقرأ المزيد" في المشاريع
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const projectText = this.previousElementSibling;
            projectText.classList.toggle('expanded');
            this.textContent = projectText.classList.contains('expanded') ? 'اقرأ أقل' : 'اقرأ المزيد';
        });
    });

    // الأسئلة الشائعة
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // إغلاق جميع الأسئلة الأخرى
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // فتح/إغلاق السؤال الحالي
            item.classList.toggle('active');
        });
    });

    // زر التواصل الثابت
    const stickyCta = document.getElementById('stickyCta');
    const heroSection = document.getElementById('home');
    
    window.addEventListener('scroll', () => {
        // تغيير لون شريط التنقل
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'var(--black)';
            header.style.backdropFilter = 'none';
        }

        // إظهار/إخفاء الزر الثابت
        if (window.scrollY > heroSection.offsetHeight + 200) {
            stickyCta.classList.add('show');
        } else {
            stickyCta.classList.remove('show');
        }
    });

    // معرض الصور
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const projectImages = document.querySelectorAll('.project-card img, .collage-item img');

    projectImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            lightbox.classList.add('active');
            lightboxImg.src = this.src;
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // التمرير السلس
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // مساعد الذكاء الاصطناعي
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    const quickReplies = document.querySelectorAll('.quick-reply');
    const notificationBadge = document.querySelector('.notification-badge');

    // فتح/إغلاق نافذة الدردشة
    chatToggle.addEventListener('click', () => {
        chatContainer.classList.toggle('active');
        if (chatContainer.classList.contains('active')) {
            notificationBadge.style.display = 'none';
            chatInput.focus();
        }
    });

    chatClose.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });

    // إرسال الرسالة
    const sendMessage = () => {
        const message = chatInput.value.trim();
        if (message) {
            addUserMessage(message);
            chatInput.value = '';
            setTimeout(() => {
                showTypingIndicator();
                setTimeout(() => {
                    hideTypingIndicator();
                    generateBotResponse(message);
                }, 1500);
            }, 500);
        }
    };

    // إضافة رسالة المستخدم
    const addUserMessage = (message) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            ${message}
            <div class="message-time">${getCurrentTime()}</div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    };

    // إضافة رسالة البوت
    const addBotMessage = (message) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        messageDiv.innerHTML = `
            ${message}
            <div class="message-time">${getCurrentTime()}</div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    };

    // عرض مؤشر الكتابة
    const showTypingIndicator = () => {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
    };

    // إخفاء مؤشر الكتابة
    const hideTypingIndicator = () => {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    };

    // توليد رد البوت
    const generateBotResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();
        let response = '';

        // قاعدة البيانات للردود
        if (lowerMessage.includes('خدم') || lowerMessage.includes('خدمات')) {
            response = 'نقدم في Diamond Wing مجموعة واسعة من الخدمات:\n\n🏗️ **البناء والتشييد**: خدمات بناء متكاملة من التصميم إلى التنفيذ\n⚡ **الخدمات الكهربائية**: تركيب وصيانة جميع الأنظمة الكهربائية\n🎨 **الديكورات**: تصميم وتنفيذ ديكورات مبتكرة\n🚚 **الخدمات اللوجستية**: حلول لوجستية متكاملة\n\nهل تود معرفة المزيد عن خدمة معينة؟';
        } else if (lowerMessage.includes('سعر') || lowerMessage.includes('عرض') || lowerMessage.includes('تكلفة')) {
            response = 'للحصول على عرض سعر مجاني، يمكنك التواصل معنا عبر:\n\n📞 **الهاتف**: 0782080028\n💬 **واتساب**: نفس الرقم\n📧 **البريد**: dwsljordan@gmail.com\n\nسيقوم فريقنا بدراسة متطلباتك وتقديم عرض مناسب في أسرع وقت.';
        } else if (lowerMessage.includes('منطق') || lowerMessage.includes('تغطي') || lowerMessage.includes('منطقة')) {
            response = 'نقدم خدماتنا في جميع أنحاء المملكة الأردنية الهاشمية، مع تركيز خاص على:\n\n🏙️ **العقبة والمحافظات الجنوبية**\n🏙️ **عمان والمنطقة الوسطى**\n🏙️ **المحافظات الشمالية**\n\nفريقنا جاهز للوصول إليك في أي مكان في الأردن!';
        } else if (lowerMessage.includes('ضمان') || lowerMessage.includes('ضمانات')) {
            response = 'نعم، نقدم ضمانات شاملة على جميع أعمالنا:\n\n✅ **ضمان الجودة**: التزام بأعلى معايير الجودة\n✅ **ضمان التنفيذ**: الالتزام بالجدول الزمني\n✅ **ضمان المواد**: استخدام مواد عالية الجودة\n✅ **ضمان الصيانة**: متابعة دورية بعد التسليم\n\nمدة الضمان تختلف حسب نوع الخدمة.';
        } else if (lowerMessage.includes('بناء') || lowerMessage.includes('تشييد')) {
            response = 'خدمات البناء والتشييد تشمل:\n\n🏗️ **التصميم الهندسي**: دراسات وتصاميم دقيقة\n🏗️ **التنفيذ**: إشراف كامل على مراحل البناء\n🏗️ **الهياكل**: بناء هياكل معدنية وخرسانية\n🏗️ **الإنهاء**: أعمال التشطيب والديكور\n\nلدينا فريق من المهندسين والفنيين المحترفين.';
        } else if (lowerMessage.includes('كهرب') || lowerMessage.includes('كهرباء')) {
            response = 'خدماتنا الكهربائية تشمل:\n\n⚡ **التمديدات الكهربائية**: للمباني السكنية والتجارية\n⚡ **الأنظمة الصناعية**: تركيب وصيانة المعدات\n⚡ **الإضاءة**: تصميم وتنفيذ أنظمة إضاءة حديثة\n⚡ **الصيانة**: خدمات صيانة دورية وطارئة\n\nجميع أعمالنا تتم وفق المعايير العالمية للسلامة.';
        } else if (lowerMessage.includes('ديكور') || lowerMessage.includes('تصميم')) {
            response = 'خدمات الديكورات لدينا:\n\n🎨 **التصميم الداخلي**: تخطيط وتصميم المساحات\n🎨 **التنفيذ**: تطبيق التصاميم بأعلى جودة\n🎨 **المواد**: استخدام مواد عالية الجودة\n🎨 **الأثاث**: تنسيق وتوريد الأثاث\n\nنحول رؤيتك إلى واقع ملموس!';
        } else if (lowerMessage.includes('لوجست') || lowerMessage.includes('نقل')) {
            response = 'خدماتنا اللوجستية:\n\n🚚 **نقل المواد**: توريد ونقل مواد البناء\n🚚 **التخزين**: حلول تخزين آمنة\n🚚 **التوزيع**: توزيع فعال للمعدات والمواد\n🚚 **الإدارة**: إدارة سلسلة التوريد المتكاملة\n\nنضمن وصول موادك في الوقت المحدد وبأمان.';
        } else if (lowerMessage.includes('مرحبا') || lowerMessage.includes('اهلا') || lowerMessage.includes('مساء') || lowerMessage.includes('صباح')) {
            response = 'أهلاً بك! يسعدني مساعدتك. أنا هنا للإجابة على جميع استفساراتك حول خدمات Diamond Wing. كيف يمكنني مساعدتك اليوم؟';
        } else if (lowerMessage.includes('شكر') || lowerMessage.includes('ممتاز')) {
            response = 'شكراً لك! إذا كان لديك أي استفسار آخر، فلا تتردد في طرحه. أنا دائماً هنا لمساعدتك! 😊';
        } else {
            response = 'شكراً لسؤالك! يمكنني مساعدتك في معرفة المزيد عن:\n\n🏗️ خدمات البناء والتشييد\n⚡ الخدمات الكهربائية\n🎨 الديكورات والتصميم\n🚚 الخدمات اللوجستية\n💰 الحصول على عرض سعر\n📍 مناطق التغطية\n✅ الضمانات المقدمة\n\nما الذي يهمك أكثر؟';
        }

        addBotMessage(response);
    };

    // الحصول على الوقت الحالي
    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    };

    // التمرير لأسفل الدردشة
    const scrollToBottom = () => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // إرسال الرسالة عند الضغط على Enter
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // إرسال الرسالة عند الضغط على زر الإرسال
    chatSend.addEventListener('click', sendMessage);

    // الردود السريعة
    quickReplies.forEach(reply => {
        reply.addEventListener('click', () => {
            const message = reply.getAttribute('data-message');
            addUserMessage(message);
            setTimeout(() => {
                showTypingIndicator();
                setTimeout(() => {
                    hideTypingIndicator();
                    generateBotResponse(message);
                }, 1500);
            }, 500);
        });
    });

    // إظهار شارة الإشعارات بعد 5 ثوانٍ
    setTimeout(() => {
        if (!chatContainer.classList.contains('active')) {
            notificationBadge.style.display = 'flex';
        }
    }, 5000);
});
// ========== قسم التقييمات وإرسال الإيميل ==========

// قاعدة بيانات مؤقتة للتقييمات (في الواقع ستكون قاعدة بيانات حقيقية)
let testimonialsData = [
    {
        id: 1,
        name: "محمد أحمد",
        rating: 5,
        text: "خدمة ممتازة وجودة عالية في البناء. فريق محترف والتزام بالمواعيد.",
        date: "2025-01-15",
        verified: true
    },
    {
        id: 2,
        name: "أحمد سعيد",
        rating: 4,
        text: "عمل رائع في التمديدات الكهربائية. أنصح بالتعامل معهم.",
        date: "2025-01-10",
        verified: true
    },
    {
        id: 3,
        name: "سارة خالد",
        rating: 5,
        text: "تصميم ديكور راقي وأنيق. فريق العمل متعاون جداً.",
        date: "2025-01-05",
        verified: false
    },
    {
        id: 4,
        name: "علي محمود",
        rating: 5,
        text: "خدمات لوجستية ممتازة. توصيل سريع وآمن للمواد.",
        date: "2024-12-28",
        verified: true
    }
];

// إرسال التقييم إلى الإيميل باستخدام EmailJS
const initEmailJS = () => {
    // تهيئة EmailJS (ستحتاج إلى الحصول على Public Key من موقع emailjs.com)
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY"); // استبدل بالمفتاح الخاص بك
    }
};

// إرسال التقييم إلى الإيميل
const sendTestimonialToEmail = async (testimonialData) => {
    const templateParams = {
        to_email: 'dwsljordan@gmail.com',
        from_name: testimonialData.name || 'زائر بدون اسم',
        from_email: testimonialData.email || 'لا يوجد بريد',
        rating: testimonialData.rating,
        message: testimonialData.text,
        date: new Date().toLocaleDateString('ar-EG'),
        website: 'Diamond Wing Website'
    };
    
    try {
        if (typeof emailjs !== 'undefined') {
            await emailjs.send(
                'YOUR_SERVICE_ID', // استبدل بمعرف الخدمة
                'YOUR_TEMPLATE_ID', // استبدل بمعرف القالب
                templateParams
            );
            return true;
        } else {
            // طريقة بديلة إذا لم يكن EmailJS متاحاً
            console.log('EmailJS غير متاح. بيانات التقييم:', templateParams);
            return true;
        }
    } catch (error) {
        console.error('خطأ في إرسال الإيميل:', error);
        return false;
    }
};

// إرسال التقييم عبر AJAX إلى خادم PHP
const sendTestimonialToServer = async (testimonialData) => {
    try {
        const response = await fetch('send_testimonial.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testimonialData)
        });
        
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('خطأ في الخادم');
        }
    } catch (error) {
        console.error('خطأ في إرسال التقييم:', error);
        throw error;
    }
};

// عرض التقييمات
const displayTestimonials = () => {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    if (!testimonialsGrid) return;
    
    testimonialsGrid.innerHTML = '';
    
    // ترتيب التقييمات من الأحدث إلى الأقدم
    const sortedTestimonials = [...testimonialsData].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
    );
    
    // عرض آخر 10 تقييمات فقط
    const recentTestimonials = sortedTestimonials.slice(0, 10);
    
    recentTestimonials.forEach(testimonial => {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = 'testimonial-item';
        testimonialElement.innerHTML = `
            <div class="testimonial-header">
                <div class="testimonial-user">
                    <div class="user-avatar">
                        ${testimonial.name.charAt(0)}
                    </div>
                    <div class="user-info">
                        <h4>${testimonial.name}</h4>
                        <div class="testimonial-date">
                            ${formatDate(testimonial.date)}
                        </div>
                    </div>
                </div>
                <div class="testimonial-rating">
                    ${getStarsHTML(testimonial.rating)}
                </div>
            </div>
            <div class="testimonial-text">
                ${testimonial.text}
            </div>
            <div class="testimonial-footer">
                <span>
                    <i class="fas fa-check-circle" style="color: ${testimonial.verified ? '#4CAF50' : '#999'}"></i>
                    ${testimonial.verified ? 'مُوثَّق' : 'قيد المراجعة'}
                </span>
                <span>
                    <i class="fas fa-share-alt"></i>
                    مشاركة
                </span>
            </div>
        `;
        
        testimonialsGrid.appendChild(testimonialElement);
    });
    
    // تحديث الإحصائيات
    updateTestimonialStats();
};

// تنسيق التاريخ
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Amman'
    };
    return date.toLocaleDateString('ar-EG', options);
};

// إنشاء نجوم التقييم
const getStarsHTML = (rating) => {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        starsHTML += `<span class="rating-star ${i <= rating ? 'filled' : ''}">★</span>`;
    }
    return starsHTML;
};

// تحديث إحصائيات التقييمات
const updateTestimonialStats = () => {
    const totalTestimonials = testimonialsData.length;
    const averageRating = testimonialsData.length > 0 
        ? (testimonialsData.reduce((sum, t) => sum + t.rating, 0) / totalTestimonials).toFixed(1)
        : '0.0';
    
    const satisfiedPercentage = testimonialsData.length > 0
        ? Math.round((testimonialsData.filter(t => t.rating >= 4).length / totalTestimonials) * 100)
        : 0;
    
    // تحديث العناصر
    const averageRatingElement = document.getElementById('averageRating');
    const totalTestimonialsElement = document.getElementById('totalTestimonials');
    
    if (averageRatingElement) averageRatingElement.textContent = averageRating;
    if (totalTestimonialsElement) totalTestimonialsElement.textContent = totalTestimonials;
    
    // تحديث نسبة الرضا
    const satisfactionElement = document.querySelector('.stats-card:nth-child(3) h4');
    if (satisfactionElement) satisfactionElement.textContent = `${satisfiedPercentage}%`;
};

// التحقق من صحة النموذج
const validateTestimonialForm = () => {
    const form = document.getElementById('testimonialForm');
    const ratingInputs = form.querySelectorAll('input[name="rating"]');
    const textArea = document.getElementById('testimonialText');
    const ratingError = document.getElementById('ratingError');
    const privacyCheckbox = document.getElementById('privacyAgreement');
    
    let isValid = true;
    
    // التحقق من اختيار التقييم
    const ratingSelected = Array.from(ratingInputs).some(input => input.checked);
    if (!ratingSelected) {
        ratingError.textContent = 'الرجاء اختيار التقييم';
        isValid = false;
    } else {
        ratingError.textContent = '';
    }
    
    // التحقق من نص التقييم
    if (!textArea.value.trim()) {
        textArea.style.borderColor = '#e74c3c';
        isValid = false;
    } else {
        textArea.style.borderColor = '';
    }
    
    // التحقق من اتفاقية الخصوصية
    if (!privacyCheckbox.checked) {
        privacyCheckbox.parentElement.style.borderColor = '#e74c3c';
        isValid = false;
    } else {
        privacyCheckbox.parentElement.style.borderColor = '';
    }
    
    return isValid;
};

// إرسال التقييم
const submitTestimonial = async (e) => {
    e.preventDefault();
    
    if (!validateTestimonialForm()) {
        return;
    }
    
    const form = e.target;
    const submitBtn = document.getElementById('submitTestimonial');
    const formMessage = document.getElementById('formMessage');
    
    // جمع بيانات النموذج
    const testimonialData = {
        name: document.getElementById('userName').value.trim() || 'زائر بدون اسم',
        rating: parseInt(form.querySelector('input[name="rating"]:checked').value),
        text: document.getElementById('testimonialText').value.trim(),
        email: document.getElementById('userEmail').value.trim(),
        date: new Date().toISOString().split('T')[0],
        ip: await getClientIP(),
        userAgent: navigator.userAgent
    };
    
    // تعطيل الزر وإظهار مؤشر التحميل
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = 'جاري الإرسال...';
    
    try {
        // 1. إضافة التقييم إلى القائمة المحلية
        const newTestimonial = {
            id: testimonialsData.length + 1,
            name: testimonialData.name,
            rating: testimonialData.rating,
            text: testimonialData.text,
            date: testimonialData.date,
            verified: false
        };
        
        testimonialsData.push(newTestimonial);
        
        // 2. إرسال إلى الإيميل
        const emailSent = await sendTestimonialToEmail(testimonialData);
        
        // 3. محاولة الإرسال إلى الخادم
        let serverResponse = null;
        try {
            serverResponse = await sendTestimonialToServer(testimonialData);
        } catch (serverError) {
            console.log('سيتم حفظ التقييم محلياً فقط');
        }
        
        // 4. عرض رسالة النجاح
        formMessage.textContent = emailSent 
            ? 'شكراً لتقييمك! تم إرسال التقييم بنجاح وسيتم مراجعته قريباً.'
            : 'شكراً لتقييمك! تم حفظ التقييم محلياً.';
        formMessage.className = 'form-message success';
        
        // 5. إعادة تعيين النموذج
        form.reset();
        
        // 6. تحديث عرض التقييمات
        displayTestimonials();
        
        // 7. إظهار إشعار
        showNotification('تم إرسال التقييم بنجاح!', 'success');
        
    } catch (error) {
        // عرض رسالة الخطأ
        formMessage.textContent = 'عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.';
        formMessage.className = 'form-message error';
        
        showNotification('حدث خطأ أثناء الإرسال', 'error');
    } finally {
        // إعادة تفعيل الزر
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال التقييم';
        
        // إخفاء رسالة النموذج بعد 5 ثواني
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
};

// الحصول على IP العميل
const getClientIP = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return 'غير معروف';
    }
};

// إظهار الإشعارات
const showNotification = (message, type = 'info') => {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // أنماط الإشعار
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
    `;
    
    // زر الإغلاق
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار تلقائياً بعد 5 ثواني
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
};

// أنماط متحركة للإشعارات
const addNotificationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-close {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: inherit;
            margin-right: auto;
        }
    `;
    document.head.appendChild(style);
};

// تهيئة قسم التقييمات
const initTestimonialsSection = () => {
    const testimonialForm = document.getElementById('testimonialForm');
    
    if (testimonialForm) {
        // إضافة أنماط الإشعارات
        addNotificationStyles();
        
        // تهيئة EmailJS
        initEmailJS();
        
        // عرض التقييمات الحالية
        displayTestimonials();
        
        // إضافة مستمع حدث للنموذج
        testimonialForm.addEventListener('submit', submitTestimonial);
        
        // التحقق الفوري من النجوم
        const ratingInputs = testimonialForm.querySelectorAll('input[name="rating"]');
        ratingInputs.forEach(input => {
            input.addEventListener('change', () => {
                document.getElementById('ratingError').textContent = '';
            });
        });
        
        // التحقق الفوري من نص التقييم
        const textArea = document.getElementById('testimonialText');
        textArea.addEventListener('input', () => {
            textArea.style.borderColor = '';
        });
        
        // التحقق الفوري من اتفاقية الخصوصية
        const privacyCheckbox = document.getElementById('privacyAgreement');
        privacyCheckbox.addEventListener('change', () => {
            privacyCheckbox.parentElement.style.borderColor = '';
        });
    }
};

// استدعاء تهيئة قسم التقييمات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initTestimonialsSection, 1000);
});