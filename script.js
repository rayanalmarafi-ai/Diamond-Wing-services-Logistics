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
