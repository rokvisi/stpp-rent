export const themes = {
    neutral: {
        '--toastBarHeight': 0
    },
    success: {
        '--toastBackground': 'rgba(72,187,120,0.9)',
        '--toastBarHeight': 0
    },
    error: {
        '--toastBackground': 'rgba(224,102,102,0.9)',
        '--toastBarHeight': 0
    }
};

export const toastOpts = {
    neutral: { duration: 2000, theme: themes.neutral },
    success: { duration: 2000, theme: themes.success },
    error: { duration: 4000, theme: themes.error }
}