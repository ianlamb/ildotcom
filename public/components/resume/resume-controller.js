angular.module('app.resume', [])
    .controller('ResumeController',
        function($scope) {
        'use strict';
        
        $scope.resume = {
            "name": "Ian Lamb",
            "address": "London, ON, Canada",
            "phone": "+1-519-902-6533",
            "email": "ianlamb32@gmail.com",
            "website": "http://ianlamb.com",
            "objective": "I am a driven web developer looking to work with great people to create amazing experiences. I have a strong understanding of key programming concepts, design patterns, performant and organized coding practices, and cross-browser/usability considerations. I'm a dependable worker and passionate about building quality websites. I would love to hear from anyone looking for part-time contracting work, open-source contributions or networking.",
            "skillCats": [
                {
                    "title": "Front-End",
                    "skills": [
                        "HTML5/CSS",
                        "JavaScript/jQuery",
                        "AngularJS",
                        "Bootstrap/Foundation"
                    ]
                },
                {
                    "title": "Platform",
                    "skills": [
                        "Windows",
                        "Linux",
                        "Mac OSX",
                        "Android"
                    ]
                },
                {
                    "title": "Back-End",
                    "skills": [
                        "NodeJS/Express",
                        "ASP.NET MVC",
                        "PHP/Laravel",
                        "Java/Spring",
                        "MySQL/MongoDB"
                    ]
                },
                {
                    "title": "Tooling",
                    "skills": [
                        "Git/SVN SCM",
                        "Jenkins/Hudson CI",
                        "Apache/Glassfish/Tomcat",
                        "Bower/NPM/Grunt"
                    ]
                }
            ],
            "jobs": [
                {
                    "title": "Cineplex Digital Networks",
                    "tenure": "Jun 2014 – Present",
                    "website": "http://www.cineplexdigitalnetworks.com/",
                    "logo": "http://www.cineplexdigitalnetworks.com/sites/default/files/logo.png",
                    "description": "Strategic In-Store Digital for the World's Best Brands",
                    "location": "London, ON, Canada",
                    "position": "Web UI Developer",
                    "lineItems": [
                        "Full-stack java development in a linux environment",
                        "Improving performance, code quality and test coverage of existing code bases",
                        "Building and maintaining the management systems for large digital interactive signage networks",
                        "Rapid development of interactive media content in JavaScript/HTML5 for touch displays and tablets"
                    ]
                },
                {
                    "title": "GoodLife Fitness",
                    "tenure": "Jan 2013 – Jun 2014",
                    "website": "http://goodlifefitness.com",
                    "logo": "http://www.goodlifefitness.com/reference/img/icons/goodlife-logo-trim.png?20140911",
                    "description": "Canada's Best Fitness Clubs and Gyms",
                    "location": "London, ON, Canada",
                    "position": "Solutions Developer",
                    "lineItems": [
                        "Developed, designed and maintained large ASP and .NET applications used by thousands of users",
                        "Collaborated with developers, architects and business analysts to bring features to production",
                        "Production/deployment support and build server maintenance",
                        "Scrum Master duties such as sprint organization and facilitation of work between team members",
                        "Interviewing and on-boarding co-ops and new hires",
                        "Earned praise in two “FedEx Day” innovation events"
                    ]
                },
                {
                    "title": "Igniteck Inc",
                    "tenure": "Sep 2012 – Jan 2013",
                    "website": "",
                    "logo": "",
                    "description": "",
                    "location": "London, ON, Canada",
                    "position": "Web Developer",
                    "lineItems": [
                        "Designed and created a fully responsive administration panel in ASP.NET MVC",
                        "Collaborated in a fast-paced development environment on Team Foundation Server"
                    ]
                },
                {
                    "title": "Blackberry",
                    "tenure": "May 2012 – Aug 2012",
                    "website": "http://blackberry.com",
                    "logo": "",
                    "description": "",
                    "location": "Waterloo, ON, Canada",
                    "position": "Software Tester & Developer (co-op)",
                    "lineItems": [
                        "Collaborated on porting SlipStream's proxy client (C/C++) from Linux to QNX",
                        "Created a tablet-optimized web interface for configuration of the proxy client",
                        "Refactored internal systems and updated localization scripts"
                    ]
                },
                {
                    "title": "Info-Tech Research Group",
                    "tenure": "Sep 2011 – Dec 2011",
                    "website": "http://infotech.com/",
                    "logo": "",
                    "description": "",
                    "location": "London, ON, Canada",
                    "position": "Software Developer (co-op)",
                    "lineItems": [
                        "Introduced to Agile development practices",
                        "Maintained core client-facing website built with Ruby on Rails",
                        "Minor feature enhancements to Salesforce system",
                        "Lead an innovation day project with other co-op students"
                    ]
                },
                {
                    "title": "Lawson Research Institute",
                    "tenure": "Dec 2010 – Apr 2011",
                    "website": "https://lawsonresearch.com/",
                    "logo": "",
                    "description": "",
                    "location": "London, ON, Canada",
                    "position": "Web Developer (co-op)",
                    "lineItems": [
                        "Performed front and back-end web development using Codeigniter and JavaScript",
                        "Rapid prototype development to keep up with frequent client demonstrations and requirements changes",
                        "Maintained hospital security and usability standards"
                    ]
                },
            ],
            "schools": [
                {
                    "title": "Fanshawe College",
                    "tenure": "Sep 2009 – Dec 2012",
                    "website": "http://www.fanshawec.ca/",
                    "location": "London, ON, Canada",
                    "certificate": "Computer Programmer Analyst Advanced Diploma",
                    "extra": "Graduated with honours"
                },
                {
                    "title": "A.B. Lucas Secondary School",
                    "tenure": "Sep 2005 – Jun 2009",
                    "website": "http://www.tvdsb.ca/Lucas.cfm",
                    "location": "London, ON, Canada",
                    "certificate": "Ontario Secondary School Diploma",
                    "extra": ""
                }
            ]
        };
    
        // handle resume pdf conversion
        $scope.downloadResume = function() {
            ga('send', 'event', 'button', 'click', 'download-resume');
    
            var fontSize = 12;
            var leftOffset = 15;
            var lineHeight = 6;
            var maxLineWidth = 180;
            var cursor = 10;
            var doc = new jsPDF();
            doc.setProperties({
                title: 'Resume - Ian Lamb',
                author: 'Ian Lamb'
            });
            
            doc.setFontSize(fontSize);
            
            doc.text($scope.resume.name, leftOffset, cursor+=lineHeight);
            doc.text($scope.resume.address, leftOffset, cursor+=lineHeight);
            doc.text($scope.resume.phone, leftOffset, cursor+=lineHeight);
            doc.text($scope.resume.email, leftOffset, cursor+=lineHeight);
            doc.text($scope.resume.website, leftOffset, cursor+=lineHeight);
            doc.text('', leftOffset, cursor+=lineHeight);
            
            doc.text('// OBJECTIVE', leftOffset, cursor+=lineHeight);
            var lines = doc.splitTextToSize($scope.resume.objective, maxLineWidth);
            lines.forEach(function(line) {
                doc.text(line, leftOffset, cursor+=lineHeight);
            });
            doc.text('', leftOffset, cursor+=lineHeight);
            
            doc.text('// SKILLS', leftOffset, cursor+=lineHeight);
            $scope.resume.skillCats.forEach(function(cat) {
                var text = cat.title;
                cat.skills.forEach(function(skill) {
                    text += ' | ' + skill;
                });
                doc.text(text, leftOffset, cursor+=lineHeight);
            });
            doc.text('', leftOffset, cursor+=lineHeight);
    
            doc.text('// EXPERIENCE', leftOffset, cursor+=lineHeight);
            $scope.resume.jobs.forEach(function(job, index) {
                var text = job.title + ' - ' + job.location;
                text += ' (' + job.tenure + ')';
                doc.text(text, leftOffset, cursor+=lineHeight);
                doc.text(job.position, leftOffset, cursor+=lineHeight);
                job.lineItems.forEach(function(item) {
                    lines = doc.splitTextToSize('-   ' + item, maxLineWidth);
                    lines.forEach(function(line, i) {
                        doc.text(i > 0 ? '    ' + line : line, leftOffset, cursor+=lineHeight);
                    });
                });
                doc.text('', leftOffset, cursor+=lineHeight);
                if (index === 1) {
                    doc.addPage();
                    cursor = 10;
                }
            });
            
            doc.text('// EDUCATION', leftOffset, cursor+=lineHeight);
            $scope.resume.schools.forEach(function(school) {
                var text = school.title + ' - ' + school.location;
                text += ' (' + school.tenure + ')';
                doc.text(text, leftOffset, cursor+=lineHeight);
                doc.text(school.certificate, leftOffset, cursor+=lineHeight);
                if (school.extra) {
                    doc.text(school.extra, leftOffset, cursor+=lineHeight);
                }
                doc.text('', leftOffset, cursor+=lineHeight);
            });
            
            doc.text('// REFERENCES AVAILABLE UPON REQUEST', leftOffset, cursor+=lineHeight);
            
            doc.save('Resume-IanLamb.pdf');
        };
        
    });
