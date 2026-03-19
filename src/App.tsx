import { useState, useMemo } from 'react';
import { SlideFrame } from './components/core/SlideFrame';
import { layoutRegistry, getLayoutsByCategory } from './config/layout-registry';
import { decorationPresets } from './components/decorations';
import { tokens } from './config/tokens';
import type { TemplateCategory, DecorationConfig } from './types/slide';

// 全テンプレートのサンプルデータ
const sampleContent: Record<number, Record<string, unknown>> = {
  // A. タイトル・セクション系
  1: { title: 'Minimalist\nBusiness Slides', subtitle: 'Here is where your presentation begins', presenter: 'towada', date: '2026-03-20' },
  2: { sectionNumber: '01', title: 'Introduction', subtitle: 'Getting started with the basics' },
  3: { title: 'Key Takeaways', keyPoints: [{ text: 'Revenue grew 23% year-over-year' }, { text: '3 new enterprise clients acquired' }, { text: 'APAC expansion on track' }] },
  4: { items: [{ number: '01', label: 'Introduction', description: 'Describe the topic of the section here' }, { number: '02', label: 'Company', description: 'Describe the topic of the section here' }, { number: '03', label: 'Analysis', description: 'Describe the topic of the section here' }, { number: '04', label: 'Conclusion', description: 'Describe the topic of the section here' }, { number: '05', label: 'Business views', description: 'Describe the topic of the section here' }, { number: '06', label: 'Financial plan', description: 'Describe the topic of the section here' }] },
  5: { title: 'Thank You', subtitle: 'We appreciate your time and attention', contactName: 'towada', contactEmail: 'towada@example.com', contactUrl: 'https://example.com' },

  // B. カラムレイアウト系
  6: { title: 'Before vs After', leftLabel: 'Before', leftPoints: [{ text: 'Manual processes' }, { text: 'Slow deployment' }, { text: 'Limited visibility' }], rightLabel: 'After', rightPoints: [{ text: 'Fully automated' }, { text: 'CI/CD pipeline' }, { text: 'Real-time dashboard' }] },
  7: { title: 'Our Approach', body: 'We combine cutting-edge technology with human-centered design to deliver solutions that truly matter. Our methodology ensures quality at every step.', image: { description: 'Team collaborating' } },
  8: { title: 'Product Showcase', body: 'The all-new dashboard gives you complete visibility into your operations with real-time analytics and customizable views.', image: { description: 'Product dashboard screenshot' } },
  9: { title: 'Our Services', columns: [{ image: { description: 'Consulting icon' }, title: 'Consulting', body: 'Expert guidance for your digital journey' }, { image: { description: 'Development icon' }, title: 'Development', body: 'Custom solutions built to scale' }, { image: { description: 'Support icon' }, title: 'Support', body: '24/7 dedicated assistance' }] },
  10: { title: 'Pricing Plans', columns: [{ title: 'Starter', body: '$29/mo\nUp to 5 users\nBasic analytics\nEmail support' }, { title: 'Professional', body: '$99/mo\nUp to 50 users\nAdvanced analytics\nPriority support' }, { title: 'Enterprise', body: 'Custom pricing\nUnlimited users\nFull analytics suite\nDedicated manager' }], accentIndex: 1 },
  11: { title: 'Core Values', columns: [{ icon: '💡', title: 'Innovation', body: 'Pushing boundaries' }, { icon: '🤝', title: 'Trust', body: 'Building relationships' }, { icon: '🎯', title: 'Focus', body: 'Results-driven' }, { icon: '🌍', title: 'Global', body: 'Worldwide reach' }] },
  12: { title: 'Skill Assessment', columns: [{ title: 'Beginner', body: 'Just starting', level: 1 }, { title: 'Basic', body: 'Fundamentals', level: 2 }, { title: 'Intermediate', body: 'Competent', level: 3 }, { title: 'Advanced', body: 'Proficient', level: 4 }, { title: 'Expert', body: 'Mastery', level: 5 }] },
  13: { title: 'Market Overview', items: [{ image: { description: 'Market chart' }, title: 'Revenue', body: 'Growing steadily' }, { image: { description: 'Users graph' }, title: 'Users', body: '1M+ active' }, { image: { description: 'Regions map' }, title: 'Regions', body: '12 countries' }, { image: { description: 'Partners logos' }, title: 'Partners', body: '50+ integrations' }] },
  14: { title: 'Portfolio', items: [{ image: { description: 'Project A' }, title: 'Project Alpha', body: 'Enterprise SaaS' }, { image: { description: 'Project B' }, title: 'Project Beta', body: 'Mobile App' }, { image: { description: 'Project C' }, title: 'Project Gamma', body: 'Data Platform' }, { image: { description: 'Project D' }, title: 'Project Delta', body: 'IoT Solution' }, { image: { description: 'Project E' }, title: 'Project Epsilon', body: 'AI/ML Pipeline' }, { image: { description: 'Project F' }, title: 'Project Zeta', body: 'Cloud Migration' }] },

  // C. 箇条リスト系
  15: { title: 'Our Process', steps: [{ title: 'Discovery', body: 'We analyze your current situation and identify key opportunities for improvement.' }, { title: 'Design', body: 'Our team creates a tailored solution blueprint aligned with your goals.' }, { title: 'Deliver', body: 'We implement, test, and deploy with continuous feedback loops.' }] },
  16: { title: 'Getting Started', steps: [{ number: '01', title: 'Sign Up', body: 'Create your account' }, { number: '02', title: 'Configure', body: 'Set your preferences' }, { number: '03', title: 'Connect', body: 'Link your data sources' }, { number: '04', title: 'Launch', body: 'Go live in minutes' }] },
  17: { title: 'Project Roadmap', events: [{ date: '2026 Q1', title: 'Research', description: 'Market analysis' }, { date: '2026 Q2', title: 'Prototype', description: 'MVP development' }, { date: '2026 Q3', title: 'Beta', description: 'User testing' }, { date: '2026 Q4', title: 'Launch', description: 'Public release' }] },
  18: { title: 'Why Choose Us', items: [{ icon: 'check', title: 'Proven Track Record', body: '10+ years of delivering results' }, { icon: 'star', title: 'Expert Team', body: 'Industry-leading specialists' }, { icon: 'shield', title: 'Enterprise Security', body: 'SOC 2 Type II certified' }, { icon: 'clock', title: '24/7 Support', body: 'Always here when you need us' }] },

  // D. パネルデザイン系
  19: { title: 'Featured Story', image: { description: 'Hero image' }, body: 'Our latest case study demonstrates how Company X achieved a 40% reduction in operational costs through digital transformation. The journey began with a comprehensive assessment...', footer: 'Published March 2026' },
  20: { title: 'Important Note', body: 'The migration window is scheduled for March 25-27. All teams should complete their preparations by March 24. Please review the migration checklist shared in the team channel.', highlight: 'Action Required: Complete preparations by March 24' },
  21: { title: 'Our Vision', body: 'We envision a world where technology seamlessly enhances human potential. Every solution we build brings us one step closer to that reality.', backgroundImage: { description: 'Abstract technology background' } },
  22: { title: 'Mission Statement', body: 'To empower businesses with intelligent solutions that drive sustainable growth and meaningful impact across every industry we serve.' },
  23: { title: 'Team Lead', image: { description: 'Profile photo' }, body: 'Jane Smith brings 15 years of experience in digital transformation. She has led over 50 enterprise projects across 12 countries.', tags: [{ text: 'Leadership' }, { text: 'Strategy' }, { text: 'Innovation' }] },

  // E. 背景・画像系
  24: { title: 'Reimagine Everything', subtitle: 'The future of enterprise software', backgroundImage: { description: 'Dramatic landscape' } },
  25: { title: 'About Our Office', body: 'Located in the heart of Tokyo, our office serves as the hub for innovation in the Asia-Pacific region. The space is designed to foster collaboration and creativity.', backgroundImage: { description: 'Modern office space' } },
  26: { day: '25', month: 'March', title: 'Product Launch', body: 'Mark your calendars for the biggest release of the year. Join us for the live unveiling event.' },
  27: { title: 'Our Locations', body: 'Present in 12 countries worldwide', images: [{ image: { description: 'Tokyo office' } }, { image: { description: 'New York office' } }, { image: { description: 'London office' } }] },

  // F. 特殊系
  28: { title: 'Key Metrics', stats: [{ value: '$4.2M', label: 'Revenue', trend: 'up' }, { value: '23%', label: 'Growth', trend: 'up' }, { value: '150+', label: 'Clients', trend: 'up' }], footnote: 'Compared to previous quarter' },
  29: { message: 'Think Different', subtext: 'Innovation distinguishes between a leader and a follower.' },
  30: { title: 'Q&A', subtitle: 'We would love to hear your questions' },

  // G. 応用パターン系
  31: { title: 'Download Our App', url: 'https://example.com/app', description: 'Scan the QR code to download our mobile app and get started in seconds.' },
  32: { question: 'What if we could reduce costs by 50%?', subtext: 'Let us show you how our platform makes it possible.' },
  33: { title: 'Design Philosophy', body: 'Great design is not just what it looks like and feels like. Great design is how it works. We obsess over every pixel and every interaction.' },
  34: { title: 'Design Process', body: 'Our iterative design process ensures every detail is refined through multiple rounds of feedback.', images: [{ image: { description: 'Wireframe' }, caption: 'Wireframe' }, { image: { description: 'Mockup' }, caption: 'Mockup' }, { image: { description: 'Final design' }, caption: 'Final' }] },
  35: { title: 'Market Share', ratios: [{ value: '72%', label: 'Our Product', total: 100 }, { value: '18%', label: 'Competitor A', total: 100 }, { value: '10%', label: 'Others', total: 100 }] },
  36: { title: 'Growth Story', body: 'Over the past year, our team has achieved remarkable milestones. We expanded into 3 new markets while maintaining our commitment to quality.', stats: [{ value: '340%', label: 'User Growth' }, { value: '$12M', label: 'ARR' }] },
  37: { title: 'Executive Summary', keyPoints: [{ text: 'Revenue exceeded targets by 15%' }, { text: 'Customer satisfaction at all-time high of 94%' }, { text: 'Successfully launched in 3 new markets' }], backgroundImage: { description: 'Abstract gradient' } },
  38: { title: 'Achievements', items: [{ text: 'Launched v2.0 with 50+ new features' }, { text: 'Expanded team to 120 members' }, { text: 'Won Best SaaS Product 2026 award' }], stats: [{ value: '99.9%', label: 'Uptime' }, { value: '4.8', label: 'App Rating' }] },
  39: { title: 'Segment Analysis', categories: [{ label: 'Enterprise', stat: '$2.8M', points: [{ text: 'High-value contracts' }, { text: 'Long-term relationships' }] }, { label: 'SMB', stat: '$1.2M', points: [{ text: 'High volume' }, { text: 'Self-service model' }] }, { label: 'Consumer', stat: '$0.2M', points: [{ text: 'Growing rapidly' }, { text: 'Freemium conversion' }] }] },

  // H. 動画系
  40: { title: 'Product Demo', video: { description: 'Product walkthrough video' }, overlay: 'Watch our 2-minute product tour' },
  41: { title: 'How It Works', body: 'Our platform automates the entire workflow from data ingestion to insight generation. Watch the demo to see it in action.', video: { description: 'Platform demo' } },
  42: { title: 'Customer Story', body: 'Hear directly from our customers about how our solution transformed their operations and delivered measurable results.', video: { description: 'Customer testimonial' } },
  43: { video: { description: 'Feature highlight reel' }, caption: 'See what\'s new in version 3.0' },
  44: { title: 'Before & After', leftVideo: { description: 'Old workflow' }, rightVideo: { description: 'New workflow' }, leftLabel: 'Before', rightLabel: 'After' },
};

// カテゴリ定義
const categories: Array<{ key: TemplateCategory; label: string }> = [
  { key: 'title', label: 'A. タイトル・セクション系' },
  { key: 'columns', label: 'B. カラムレイアウト系' },
  { key: 'list', label: 'C. 箇条リスト系' },
  { key: 'panel', label: 'D. パネルデザイン系' },
  { key: 'background-image', label: 'E. 背景・画像系' },
  { key: 'special', label: 'F. 特殊系' },
  { key: 'applied', label: 'G. 応用パターン系' },
  { key: 'video', label: 'H. 動画系' },
];

// プリセット一覧
const presetNames = Object.keys(decorationPresets);

function App() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [exposure, setExposure] = useState(1.0);
  const [filterCategory, setFilterCategory] = useState<TemplateCategory | 'all'>('all');
  const [selectedPreset, setSelectedPreset] = useState<string>('title');

  const layout = layoutRegistry[activeSlide];
  const content = sampleContent[activeSlide];
  const Component = layout?.component;

  // 全ページ共通のデコレーション設定（テンプレートのslotOverrideを反映）
  const slideDecoration: DecorationConfig | undefined = useMemo(() => {
    const base = decorationPresets[selectedPreset];
    if (!base) return undefined;
    if (!layout?.decoration) return undefined;

    const slots = { ...base.slots };
    if (layout.slotOverride) {
      for (const [pos, val] of Object.entries(layout.slotOverride)) {
        if (val === false) {
          delete slots[pos as keyof typeof slots];
        } else if (val) {
          (slots as any)[pos] = val;
        }
      }
    }

    return { ...base, slots, exposure };
  }, [selectedPreset, exposure, layout]);

  const filteredLayouts = useMemo(() => {
    if (filterCategory === 'all') {
      return Object.keys(layoutRegistry).map(Number).sort((a, b) => a - b);
    }
    return getLayoutsByCategory(filterCategory).map(([num]) => num);
  }, [filterCategory]);

  const scale = Math.min(
    (window.innerWidth - 320) / tokens.slide.width,
    (window.innerHeight - 100) / tokens.slide.height,
  );

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#1a1a1a', fontFamily: tokens.font.body }}>
      {/* サイドバー */}
      <div style={{
        width: 280,
        backgroundColor: '#222',
        color: '#ccc',
        overflowY: 'auto',
        padding: 12,
        fontSize: 13,
        flexShrink: 0,
      }}>
        <h3 style={{ color: '#fff', margin: '0 0 12px', fontSize: 15 }}>Layouts (44)</h3>

        {/* カテゴリフィルタ */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as TemplateCategory | 'all')}
          style={{ width: '100%', padding: '6px 8px', marginBottom: 12, backgroundColor: '#333', color: '#fff', border: '1px solid #444', borderRadius: 4, fontSize: 12 }}
        >
          <option value="all">All (44)</option>
          {categories.map((c) => (
            <option key={c.key} value={c.key}>{c.label}</option>
          ))}
        </select>

        {/* レイアウト一覧 */}
        {filteredLayouts.map((num) => {
          const entry = layoutRegistry[num];
          return (
            <div
              key={num}
              onClick={() => setActiveSlide(num)}
              style={{
                padding: '8px 10px',
                marginBottom: 2,
                borderRadius: 4,
                cursor: 'pointer',
                backgroundColor: activeSlide === num ? '#3b82f6' : 'transparent',
                color: activeSlide === num ? '#fff' : '#ccc',
                transition: 'background-color 0.15s',
              }}
            >
              <span style={{ opacity: 0.5, marginRight: 8 }}>#{num}</span>
              {entry.name}
            </div>
          );
        })}

        {/* デコレーション設定（全ページ共通） */}
        <div style={{ marginTop: 20, padding: '12px 0', borderTop: '1px solid #333' }}>
          <div style={{ color: '#fff', fontWeight: 600, marginBottom: 8, fontSize: 13 }}>Decoration (global)</div>

          <div style={{ marginBottom: 8 }}>
            <div style={{ marginBottom: 4 }}>preset</div>
            <select
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', backgroundColor: '#333', color: '#fff', border: '1px solid #444', borderRadius: 4, fontSize: 12 }}
            >
              {presetNames.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 4 }}>
            exposure: <strong>{exposure.toFixed(2)}</strong>
          </div>
          <input
            type="range"
            min={0} max={1} step={0.05}
            value={exposure}
            onChange={(e) => setExposure(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        {/* ユースケース表示 */}
        {layout && (
          <div style={{ marginTop: 12, padding: '12px 0', borderTop: '1px solid #333', fontSize: 12 }}>
            <div style={{ color: '#fff', fontWeight: 600, marginBottom: 6 }}>Use Case</div>
            <div style={{ marginBottom: 8, lineHeight: 1.5 }}>{layout.useCase.primary}</div>
            <div style={{ color: '#888', marginBottom: 4 }}>Scenarios:</div>
            {layout.useCase.scenarios.map((s, i) => (
              <div key={i} style={{ marginLeft: 8, marginBottom: 2 }}>• {s}</div>
            ))}
            <div style={{ color: '#888', marginTop: 8, marginBottom: 4 }}>Best for:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {layout.useCase.bestFor.map((tag) => (
                <span key={tag} style={{ padding: '2px 6px', backgroundColor: '#333', borderRadius: 4, fontSize: 11 }}>{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* メインプレビュー */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {Component && content && (
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            <SlideFrame
              slideIndex={activeSlide}
              decoration={slideDecoration}
            >
              <Component content={content} slideIndex={activeSlide} />
            </SlideFrame>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
