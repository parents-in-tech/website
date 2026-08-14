type ProjectStatus = "active" | "in-development" | "coming-soon";

interface Project {
	slug: string;
	name: string;
	tagline: string;
	description?: string;
	status: ProjectStatus;
	repo?: string;
	landing?: string;
	demo?: string;
}

// Keep archived projects out of this catalog. Only expose repo URLs for public repositories.
export const projects: Project[] = [
	{
		slug: "balakatha",
		name: "Balakatha",
		tagline:
			"Illustrated Hindu mythology stories for children, read aloud in English, Nepali and Hindi.",
		description:
			"A multilingual story library with illustrations and read-aloud narration.",
		status: "active",
		landing: "https://balakatha.parentsintech.org",
	},
	{
		slug: "langlang",
		name: "LangLang",
		tagline: "Keep your family language in the family.",
		description:
			"Parents choose the words. Children listen, trace, and recognize them—one short lesson at a time.",
		status: "active",
		landing: "https://langlang.parentsintech.org",
		demo: "https://demo.langlang.parentsintech.org/kid",
	},
	{
		slug: "musicguru",
		name: "MusicGuru",
		tagline: "Gamified musical-instrument learning for children.",
		description:
			"A Flutter app with interactive piano lessons, progress tracking, achievements, and more instruments planned.",
		status: "in-development",
		repo: "https://github.com/parents-in-tech/musicguru",
	},
];
