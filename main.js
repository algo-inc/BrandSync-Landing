import './style.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CountUp } from 'countup.js';

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const initCountUp = () => {
    const counters = document.querySelectorAll('.count');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const countUp = new CountUp(counter, target, { duration: 2 , useGrouping: false});
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    countUp.reset();
                    countUp.start();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
};

AOS.init({
    once: false
});

document.addEventListener('aos:in', ({ detail }) => {
    if (detail.classList.contains('count')) {
        const target = +detail.getAttribute('data-count');
        const countUp = new CountUp(detail, target, { duration: 2 });
        countUp.reset();  // Reset count before starting
        if (!countUp.error) {
            countUp.start();
        } else {
            console.error(countUp.error);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initCountUp();
});
