import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react';
import { STATUS_LABELS, type ProjectStatus } from '../../content/projects';

/** Scroll-reveal wrapper (IntersectionObserver, unobserves after reveal). */
export function Reveal({ children, as: Tag = 'div', delay = 0, className = '' }: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={`reveal ${inView ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function Status({ status, note }: { status: ProjectStatus; note?: string }) {
  return (
    <span className="status">
      {STATUS_LABELS[status]}
      {note ? <span className="status-note">— {note}</span> : null}
    </span>
  );
}

/** Lightweight highlighted code block with copy button. */
export function CodeBlock({ code, lang = 'ts', title }: { code: string; lang?: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  const html = highlight(code);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <figure className="codeblock" style={{ marginInline: 0 }}>
      <header>
        <span>{title ?? lang}</span>
        <button className={`copy-btn ${copied ? 'done' : ''}`} onClick={() => void copy()} aria-label="Copy code">
          {copied ? 'copied ✓' : 'copy'}
        </button>
      </header>
      <pre><code dangerouslySetInnerHTML={{ __html: html }} /></pre>
    </figure>
  );
}

/** Minimal, safe tokenizer — escapes first, then wraps known tokens. */
function highlight(src: string): string {
  const esc = src.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc
    .replace(/(\/\/[^\n]*)/g, '<span class="tok-c">$1</span>')
    .replace(/('[^'\n]*'|"[^"\n]*")/g, '<span class="tok-s">$1</span>')
    .replace(
      /\b(import|from|export|const|let|function|return|type|interface|await|async|new|if|else|for|of|in)\b/g,
      '<span class="tok-k">$1</span>',
    );
}

export function SectionHead({ eyebrow, title, lede }: { eyebrow: string; title: ReactNode; lede?: string }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {lede ? <p className="lede" style={{ marginTop: 'var(--space-2)' }}>{lede}</p> : null}
    </Reveal>
  );
}
