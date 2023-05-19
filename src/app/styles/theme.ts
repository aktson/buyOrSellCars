import { MantineThemeOverride } from "@mantine/core";

export const myTheme: MantineThemeOverride = {
	fontFamily: "Open Sans, sans serif",
	spacing: { xs: "1rem", sm: "1.2rem", md: "1.8rem", lg: "2.2rem", xl: "2.8rem" },
	headings: {
		fontFamily: "Roboto, sans-serif",
		sizes: {
			h1: { fontSize: "5em" },
			h2: { fontSize: "1rem" },
			h3: { fontSize: "2rem" },
			h4: { fontSize: "2rem" },
			h5: { fontSize: "2rem" },
		},
	},
};
