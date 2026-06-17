// ---------------------------------------------------------------------------
// Translations. Plain strings; emphasis inside paragraphs uses markers parsed
// by lib/rich.tsx:  **bold** -> <strong>   *italic* -> <span class="em">.
// All content is real (from CV) — nothing invented.
// ---------------------------------------------------------------------------

export type Lang = "en" | "pt";

interface Job {
  role: string;
  org: string;
  loc: string;
  period: string;
  desc: string;
  tags: string[];
}

interface Cert {
  name: string;
  detail: string;
}

export const translations = {
  en: {
    label: "English",
    nav: {
      experience: "Experience",
      blog: "Blog",
      about: "About",
      contact: "Contact",
      cta: "Get in touch",
    },
    hero: {
      eyebrow: "Security Engineer · AppSec & Pentest",
      line1: "I make",
      line3: "happen.",
      words: ["security", "research", "defenses", "impact"],
      sub: "I'm **Lucas Reis**, a security engineer (AppSec) at **PagBank** and a pentester. I study Computer Science at **UFABC** — a Brazilian federal university whose interdisciplinary foundation shaped how I bridge theory and practice — and I coordinate the **Green Team Hacker Club**, playing and teaching CTF. I've studied security on my own since before university, driven by *making things happen*.",
      ctaPrimary: "See my path",
      ctaSecondary: "Get in touch",
      recog: "Background",
    },
    about: {
      eyebrow: "About",
      p1: "I've studied information security on my own since before university. At **UFABC** — a Brazilian federal university — I got a solid, interdisciplinary academic foundation that shaped how I think about security.",
      p2: "Today I'm a **security engineer (AppSec)** at PagBank — pentesting Web, API and Mobile, plus threat modeling, SAST, DAST and DevSecOps. Before that I was a security analyst (SIEM, MITRE ATT&CK, AWS) and researched cryptography: the internal state of block ciphers like *AES and TEA*.",
      p3: "For over two years I've coordinated the **Green Team Hacker Club**, teaching Web Hacking, Cryptography, Forensics, Reverse Engineering and Binary Exploitation, and captaining our CTF team. I also aspire to software engineering — above all, I like *making things happen*.",
      facts: [
        "Security Engineer @ PagBank",
        "Computer Science · UFABC",
        "Coordinator since 2022",
        "Certified in Cybersecurity",
      ],
    },
    experience: {
      eyebrow: "Career",
      h2a: "Experience &",
      h2b: "certifications.",
      lede: "Where I've worked, researched, and taught — from a federal university lab to AppSec in production.",
      items: [
        {
          role: "Security Engineer · AppSec",
          org: "PagBank",
          loc: "São Paulo, SP",
          period: "Oct 2024 — Present",
          desc: "Pentesting Web, API and Mobile; threat modeling, SAST, DAST and DevSecOps across cloud, on a mobile-focused (iOS/Android) security team. OWASP day to day.",
          tags: ["Pentest", "Threat Modeling", "SAST · DAST", "DevSecOps", "Cloud", "Mobile", "OWASP"],
        },
        {
          role: "Cyber Security Trainee",
          org: "Go Ahead IT",
          loc: "São Paulo, SP",
          period: "Nov 2023 — Jul 2024",
          desc: "Administered IBM QRadar SIEM, worked with MITRE ATT&CK and AWS, automated in Python and wrote playbooks — rotating across networks, collaboration, contracts and security.",
          tags: ["SIEM · QRadar", "MITRE ATT&CK", "AWS", "Python", "Playbooks"],
        },
        {
          role: "Information Security Coordinator",
          org: "Green Team Hacker Club · UFABC",
          loc: "Santo André, SP",
          period: "Sep 2022 — Present",
          desc: "Lead the team and teach Web Hacking, Cryptography, Forensics, Reverse Engineering and Binary Exploitation. CTF player and captain.",
          tags: ["Team Leadership", "Web Hacking", "Cryptography", "Forensics", "Reverse Eng.", "Binary Exploitation", "CTF"],
        },
        {
          role: "Research Fellow · PDPD",
          org: "UFABC",
          loc: "Santo André, SP",
          period: "Nov 2022 — Nov 2023",
          desc: "Studied the evolution of the internal state of block ciphers — AES and TEA, modes of operation and entropy, implemented in C.",
          tags: ["Cryptography", "AES · TEA", "Block Ciphers", "Entropy", "C"],
        },
      ] as Job[],
      certsTitle: "Certifications",
      certs: [
        { name: "ISC2", detail: "Certified in Cybersecurity · 2023" },
        { name: "Cisco", detail: "CCNA · CyberOps · Cloud Security · Network Technician" },
        { name: "Cambridge", detail: "English B1 · 2019" },
      ] as Cert[],
    },
    contact: {
      eyebrow: "Get in touch",
      h2a: "Let's make something",
      h2b: "happen.",
      sub: "Looking for an AppSec engineer or pentester, want to talk security and CTF, or just connect — my inbox is open.",
      blurb:
        "Security engineer (AppSec) and pentester. Computer Science student at UFABC and coordinator of the Green Team Hacker Club.",
      practice: "Practice",
      practiceItems: ["AppSec", "Pentest (Web · API · Mobile)", "Threat Modeling", "DevSecOps", "Cryptography"],
      writing: "Explore",
      contact: "Contact",
      rights: "Built and self-hosted by Lucas Reis",
      handshake: "// handshake: ok — tls 1.3 — next hop: you",
    },
  },

  pt: {
    label: "Português",
    nav: {
      experience: "Trajetória",
      blog: "Blog",
      about: "Sobre",
      contact: "Contato",
      cta: "Fale comigo",
    },
    hero: {
      eyebrow: "Engenheiro de Segurança · AppSec & Pentest",
      line1: "Eu faço",
      line3: "acontecer.",
      words: ["segurança", "pesquisa", "defesas", "impacto"],
      sub: "Sou o **Lucas Reis**, engenheiro de segurança (AppSec) no **PagBank** e pentester. Estudo Ciência da Computação na **UFABC** — universidade federal cuja formação interdisciplinar moldou como eu uno teoria e prática — e coordeno o **Green Team Hacker Club**, jogando e ensinando CTF. Estudo segurança por conta própria desde antes da faculdade, movido por *fazer as coisas acontecerem*.",
      ctaPrimary: "Ver minha trajetória",
      ctaSecondary: "Fale comigo",
      recog: "Formação & passagens",
    },
    about: {
      eyebrow: "Sobre",
      p1: "Estudo segurança da informação por conta própria desde antes da faculdade. Na **UFABC** — universidade federal — tive uma formação interdisciplinar e acadêmica sólida que moldou como penso segurança.",
      p2: "Hoje sou **engenheiro de segurança (AppSec)** no PagBank — pentest de Web, API e Mobile, além de modelagem de ameaças, SAST, DAST e DevSecOps. Antes, fui analista de segurança (SIEM, MITRE ATT&CK, AWS) e pesquisei criptografia: o estado interno de cifras de bloco como *AES e TEA*.",
      p3: "Há mais de dois anos coordeno o **Green Team Hacker Club**, ensinando Web Hacking, Criptografia, Forense, Engenharia Reversa e Exploração Binária, e sou capitão do nosso time de CTF. Também aspiro à engenharia de software — acima de tudo, gosto de *fazer as coisas acontecerem*.",
      facts: [
        "Eng. de Segurança @ PagBank",
        "Ciência da Computação · UFABC",
        "Coordenador desde 2022",
        "Certified in Cybersecurity",
      ],
    },
    experience: {
      eyebrow: "Trajetória",
      h2a: "Experiência &",
      h2b: "certificações.",
      lede: "Onde trabalhei, pesquisei e ensinei — de um laboratório de universidade federal ao AppSec em produção.",
      items: [
        {
          role: "Engenheiro de Segurança · AppSec",
          org: "PagBank",
          loc: "São Paulo, SP",
          period: "Out 2024 — Atual",
          desc: "Pentest de Web, API e Mobile; modelagem de ameaças, SAST, DAST e DevSecOps em cloud, num time de segurança focado em Mobile (iOS/Android). OWASP no dia a dia.",
          tags: ["Pentest", "Modelagem de Ameaças", "SAST · DAST", "DevSecOps", "Cloud", "Mobile", "OWASP"],
        },
        {
          role: "Cyber Security Trainee",
          org: "Go Ahead IT",
          loc: "São Paulo, SP",
          period: "Nov 2023 — Jul 2024",
          desc: "Administração do SIEM IBM QRadar, frameworks (MITRE ATT&CK), AWS, automação em Python e elaboração de playbooks — com rodízio entre redes, colaboração, contratos e segurança.",
          tags: ["SIEM · QRadar", "MITRE ATT&CK", "AWS", "Python", "Playbooks"],
        },
        {
          role: "Coordenador de Segurança da Informação",
          org: "Green Team Hacker Club · UFABC",
          loc: "Santo André, SP",
          period: "Set 2022 — Atual",
          desc: "Lidero o time e ministro aulas de Web Hacking, Criptografia, Forense, Engenharia Reversa e Exploração Binária. Jogador e capitão de CTF.",
          tags: ["Gestão de Equipe", "Web Hacking", "Criptografia", "Forense", "Eng. Reversa", "Exploração Binária", "CTF"],
        },
        {
          role: "Pesquisador Bolsista · PDPD",
          org: "UFABC",
          loc: "Santo André, SP",
          period: "Nov 2022 — Nov 2023",
          desc: "Estudo da evolução do estado interno de cifras de bloco — AES e TEA, modos de operação e entropia, implementados em C.",
          tags: ["Criptografia", "AES · TEA", "Cifras de Bloco", "Entropia", "C"],
        },
      ] as Job[],
      certsTitle: "Certificações",
      certs: [
        { name: "ISC2", detail: "Certified in Cybersecurity · 2023" },
        { name: "Cisco", detail: "CCNA · CyberOps · Cloud Security · Network Technician" },
        { name: "Cambridge", detail: "Inglês B1 · 2019" },
      ] as Cert[],
    },
    contact: {
      eyebrow: "Fale comigo",
      h2a: "Vamos fazer algo",
      h2b: "acontecer.",
      sub: "Procurando um engenheiro de AppSec ou pentester, quer falar de segurança e CTF, ou só trocar ideia — minha caixa de entrada está aberta.",
      blurb:
        "Engenheiro de segurança (AppSec) e pentester. Estudante de Ciência da Computação na UFABC e coordenador do Green Team Hacker Club.",
      practice: "Atuação",
      practiceItems: ["AppSec", "Pentest (Web · API · Mobile)", "Modelagem de Ameaças", "DevSecOps", "Criptografia"],
      writing: "Explore",
      contact: "Contato",
      rights: "Feito e hospedado por Lucas Reis",
      handshake: "// handshake: ok — tls 1.3 — next hop: você",
    },
  },
};

export type Dict = (typeof translations)["en"];
