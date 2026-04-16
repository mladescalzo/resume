import { useEffect, useState } from 'react';
import profilePic from '../images/pictureniley.jpg';

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact-me', label: 'Contact' },
];

const skills = [
  { name: 'AutoCAD', value: 75 },
  { name: 'Microsoft Office', value: 85 },
  { name: 'Web Development', value: 70 },
  { name: 'Programming (C++, Java, Python)', value: 80 },
];

const experiences = [
  {
    title: 'Freelance Coder',
    company: 'Quezon City, Philippines',
    date: '2023 to Present',
    description: 'Developed small web applications and maintained code for local clients.',
  },
  {
    title: 'Data Maintenance Assistant',
    company: 'Technological Institute of the Philippines',
    date: '2022 to 2023',
    description: 'Assisted in organizing and maintaining student data records.',
  },
];

const projects = [
  {
    title: 'Personal Portfolio Website',
    description: 'Developed a responsive website using HTML, CSS, and JavaScript to showcase my skills and projects.',
  },
  {
    title: 'Simple Web Applications',
    description: 'Created small web apps for local clients, including forms and data management systems.',
  },
];

const education = [
  {
    title: 'Technological Institute of the Philippines',
    date: '2022 to Present',
    description: 'Pursuing a degree in Computer Engineering with coursework in electronics, programming, and systems design.',
  },
  {
    title: 'Nazareth School of National University',
    date: 'Senior High School, 2019 to 2021',
  },
  {
    title: 'Espiritu Santo Parochial School',
    date: 'High School, 2015 to 2019',
  },
  {
    title: 'Dtuazon Elementary School',
    date: 'Elementary, 2009 to 2015',
  },
];

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const progressBars = document.querySelectorAll('.progress-inner');
    const sections = document.querySelectorAll('section[id]');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const progressObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const bar = entry.target;
          const value = Number(bar.getAttribute('data-progress'));
          if (value) {
            bar.style.width = `${value}%`;
          }
          observer.unobserve(bar);
        });
      },
      { threshold: 0.3 }
    );

    const highlightObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
    progressBars.forEach((bar) => progressObserver.observe(bar));
    sections.forEach((section) => highlightObserver.observe(section));

    return () => {
      revealObserver.disconnect();
      progressObserver.disconnect();
      highlightObserver.disconnect();
    };
  }, []);

  return (
    <div className={navOpen ? 'app nav-open' : 'app'}>
      <nav className="nav">
        <button className="nav-toggle" onClick={() => setNavOpen((value) => !value)} aria-label="Toggle navigation">
          ☰
        </button>
        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={activeSection === link.id ? 'active' : ''}
                onClick={() => setNavOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <header>
        <img src={profilePic} alt="Louie Anthony Descalzo" className="profile-pic" />
        <div className="name-contact">
          <h1>Louie Anthony Descalzo</h1>
          <div className="contact">
            <p>Email: <a href="mailto:lacdescalzo@gmail.com">lacdescalzo@gmail.com</a></p>
            <p>Phone: <a href="tel:+639216445730">+63 921 644 5730</a></p>
            <p>Location: Quezon City, Philippines</p>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="reveal">
          <h2>About</h2>
          <p>
            I'm a dedicated computer engineering student with a passionate and hardworking attitude.
            I have experience in web development, programming in C++, Java, and Python, and proficiency in tools
            like AutoCAD and Microsoft Office. I'm eager to apply my skills in real-world projects and contribute to innovative solutions.
          </p>
        </section>

        <section id="skills" className="reveal">
          <h2>Skills</h2>
          {skills.map((skill) => (
            <div className="skill" key={skill.name}>
              <h3>
                {skill.name} <span className="skill-percent">{skill.value}%</span>
              </h3>
              <div className="progress-bar">
                <div className="progress-inner" data-progress={skill.value}></div>
              </div>
            </div>
          ))}
        </section>

        <section id="experience" className="reveal">
          <h2>Experience</h2>
          {experiences.map((item) => (
            <div className="experience-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.company} — {item.date}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </section>

        <section id="projects" className="reveal">
          <h2>Projects</h2>
          {projects.map((project) => (
            <div className="project-item" key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </section>

        <section id="education" className="reveal">
          <h2>Education</h2>
          {education.map((item) => (
            <div className="education-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.date}</p>
              {item.description && <p>{item.description}</p>}
            </div>
          ))}
        </section>

        <section id="contact-me" className="reveal">
          <h2>Contact Me</h2>
          <p>Let's connect and work together! Feel free to reach out for opportunities or collaborations.</p>
          <p><a href="mailto:lacdescalzo@gmail.com">Email me</a></p>
          <p><a href="tel:+639216445730">Call me</a></p>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Louie Anthony Descalzo. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
