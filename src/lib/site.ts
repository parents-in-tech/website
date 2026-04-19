export interface NavItem {
  href: string;
  label: string;
}

export interface LinkItem {
  href: string;
  label: string;
}

export interface ProofItem {
  label: string;
  detail: string;
}

export interface ValuePillar {
  title: string;
  body: string;
}

export interface JourneyStep {
  title: string;
  description: string;
  href?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RoadmapTheme {
  title: string;
  description: string;
}

export interface ContributionTrack {
  title: string;
  description: string;
}

export const missionStatement = 'To create safe, ad-free, and dopamine-free digital apps for our kids.';

export const navItems: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contribute', label: 'Contribute' },
  { href: '/invite', label: 'Join' },
];

export const socialLinks: LinkItem[] = [
  { href: 'https://github.com/parents-in-tech', label: 'GitHub' },
  { href: 'https://x.com/i/communities/1969469616515674424', label: 'X Community' },
  { href: 'mailto:hello@parentsintech.org', label: 'Email' },
];

export const communityProof: ProofItem[] = [
  {
    label: 'Mission-driven',
    detail: 'Every project is expected to support the mission: safe, ad-free, and dopamine-free digital apps for our kids.',
  },
  {
    label: 'Open community',
    detail: 'Conversation happens in the X community, and anyone aligned with the mission can learn, listen, and participate.',
  },
  {
    label: 'Open-source workflow',
    detail: 'The GitHub organization holds the repos, codebases, issues, and demo links that contributors work from.',
  },
  {
    label: 'Real projects',
    detail: 'The projects page pulls live repositories and shows the GitHub codebase plus the demo URL whenever a repo has one.',
  },
];

export const valuePillars: ValuePillar[] = [
  {
    title: 'Mission before engagement',
    body: 'The community exists to build digital products that are safer for kids, without ads, addictive reward loops, or attention-hacking mechanics.',
  },
  {
    title: 'Open community, open repos',
    body: 'People can join the X community to get context, then move into the GitHub org to contribute through issues, pull requests, docs, design, and testing.',
  },
  {
    title: 'Contributions that fit real life',
    body: 'Parents contribute in practical increments. Good open-source habits, clear docs, and scoped pull requests matter as much as ambitious ideas.',
  },
];

export const journeySteps: JourneyStep[] = [
  {
    title: 'Join the conversation',
    description: 'Start in the X community to meet other parents, understand the mission, and see which projects are active.',
    href: '/invite',
  },
  {
    title: 'Browse active repos',
    description: 'Review the live repositories, codebases, and demo URLs to find projects that match the mission and your skills.',
    href: '/projects',
  },
  {
    title: 'Request GitHub access',
    description: 'When you are ready to contribute in the open, request a GitHub organization invite from the join page.',
    href: '/invite#github-invite',
  },
  {
    title: 'Make a first contribution',
    description: 'Start with a small, mission-aligned improvement such as docs, a bug fix, a UI pass, or a scoped feature.',
    href: '/contribute',
  },
];

export const homepageFaq: FaqItem[] = [
  {
    question: 'Do I need to be an active open-source maintainer already?',
    answer: 'No. Small, useful contributions are welcome. The first step is understanding the mission and the projects already in progress.',
  },
  {
    question: 'Is the community only for engineers?',
    answer: 'No. The work also needs design, product thinking, writing, testing, triage, and contributor support alongside code.',
  },
  {
    question: 'How do you decide if a project belongs here?',
    answer: 'The mission is the filter. Projects should help create safe, ad-free, and dopamine-free digital experiences for kids and families.',
  },
];

export const inviteFaq: FaqItem[] = [
  {
    question: 'Who should request GitHub access?',
    answer: 'People who want to contribute directly to repositories, documentation, design, or project operations should request access after getting oriented in the community.',
  },
  {
    question: 'Can I join the community without contributing code?',
    answer: 'Yes. The public X community is the right entry point for anyone who wants to listen, learn, share resources, or explore before contributing.',
  },
  {
    question: 'What contribution guidelines do you follow?',
    answer: 'The expectation is standard open-source behavior: discuss ideas in the open, keep changes scoped, document what you change, and stay aligned with the mission.',
  },
];

export const aboutPrinciples: ValuePillar[] = [
  {
    title: 'Mission guardrails',
    body: 'Projects should make digital experiences safer for kids, not more stimulating, more extractive, or more dependent on ads and retention loops.',
  },
  {
    title: 'Build in public',
    body: 'Work happens openly in the GitHub organization so contributors can understand the codebase, comment early, and improve the work together.',
  },
  {
    title: 'Contribution is broader than code',
    body: 'Healthy repositories need writing, design, onboarding, testing, and review. The community should welcome all of that work explicitly.',
  },
];

export const roadmapThemes: RoadmapTheme[] = [
  {
    title: 'Mission-aligned app catalog',
    description: 'Grow a stronger set of working apps and experiments that clearly fit the mission and can be explored by families.',
  },
  {
    title: 'Open contribution playbooks',
    description: 'Improve repository docs, issue quality, and onboarding so new contributors can understand where to start without guesswork.',
  },
  {
    title: 'Community stewardship',
    description: 'Keep the X community welcoming, useful, and centered on the mission so contributors and families know what the group stands for.',
  },
];

export const contributionTracks: ContributionTrack[] = [
  {
    title: 'Code and architecture',
    description: 'Features, refactors, integrations, and implementation work that move a mission-aligned app forward.',
  },
  {
    title: 'Docs, design, and product framing',
    description: 'Repository docs, onboarding, interface polish, and product decisions that keep the work clear and family-centered.',
  },
  {
    title: 'Quality and community operations',
    description: 'Issue triage, testing, review, and the stewardship work that keeps projects healthy and contributor-friendly.',
  },
];
