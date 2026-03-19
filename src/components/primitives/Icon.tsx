import { type LucideIcon } from 'lucide-react';
import {
  // ビジネス・一般
  Lightbulb, Handshake, Target, Globe, Rocket, Trophy, Award, Crown,
  // チェック・状態
  Check, CheckCircle, CircleCheck, Star, Shield, ShieldCheck, Lock,
  // 時間・スケジュール
  Clock, Calendar, Timer, Hourglass,
  // コミュニケーション
  MessageCircle, Mail, Phone, Send, Megaphone,
  // データ・分析
  BarChart3, TrendingUp, TrendingDown, PieChart, Activity, Database,
  // ユーザー・チーム
  Users, UserCheck, UserPlus, Heart, ThumbsUp,
  // テクノロジー
  Code, Terminal, Cpu, Cloud, Wifi, Zap, Settings, Wrench,
  // ドキュメント・メディア
  FileText, BookOpen, Clipboard, Image, Video, Camera,
  // ナビゲーション・矢印
  ArrowRight, ArrowUp, ChevronRight, ExternalLink, Download, Upload,
  // その他
  Search, Eye, MapPin, Building2, Briefcase, DollarSign, CreditCard,
  CircleDot, Layers, Package, Puzzle, Sparkles, Leaf, Flame,
} from 'lucide-react';

// skill で使用可能なアイコン一覧
// deck.json では icon フィールドにこのキー名を指定する
const iconMap: Record<string, LucideIcon> = {
  // ビジネス・一般
  lightbulb: Lightbulb,
  handshake: Handshake,
  target: Target,
  globe: Globe,
  rocket: Rocket,
  trophy: Trophy,
  award: Award,
  crown: Crown,
  // チェック・状態
  check: Check,
  'check-circle': CheckCircle,
  'circle-check': CircleCheck,
  star: Star,
  shield: Shield,
  'shield-check': ShieldCheck,
  lock: Lock,
  // 時間
  clock: Clock,
  calendar: Calendar,
  timer: Timer,
  hourglass: Hourglass,
  // コミュニケーション
  message: MessageCircle,
  mail: Mail,
  phone: Phone,
  send: Send,
  megaphone: Megaphone,
  // データ
  chart: BarChart3,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  'pie-chart': PieChart,
  activity: Activity,
  database: Database,
  // ユーザー
  users: Users,
  'user-check': UserCheck,
  'user-plus': UserPlus,
  heart: Heart,
  'thumbs-up': ThumbsUp,
  // テクノロジー
  code: Code,
  terminal: Terminal,
  cpu: Cpu,
  cloud: Cloud,
  wifi: Wifi,
  zap: Zap,
  settings: Settings,
  wrench: Wrench,
  // ドキュメント
  file: FileText,
  book: BookOpen,
  clipboard: Clipboard,
  image: Image,
  video: Video,
  camera: Camera,
  // ナビゲーション
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'chevron-right': ChevronRight,
  'external-link': ExternalLink,
  download: Download,
  upload: Upload,
  // その他
  search: Search,
  eye: Eye,
  'map-pin': MapPin,
  building: Building2,
  briefcase: Briefcase,
  dollar: DollarSign,
  'credit-card': CreditCard,
  dot: CircleDot,
  layers: Layers,
  package: Package,
  puzzle: Puzzle,
  sparkles: Sparkles,
  leaf: Leaf,
  flame: Flame,
};

// 使用可能なアイコン名の一覧（skill定義用）
export const availableIcons = Object.keys(iconMap);

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 24, color, strokeWidth = 2 }: IconProps) {
  const LucideComponent = iconMap[name];

  if (!LucideComponent) {
    // フォールバック: 丸にアイコン名の頭文字
    return (
      <div style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color ?? '#0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: size * 0.45,
        fontWeight: 600,
      }}>
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return <LucideComponent size={size} color={color} strokeWidth={strokeWidth} />;
}
