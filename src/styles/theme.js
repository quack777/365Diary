const size = {
    basic: "1440px",
    mobile: "414px",
};

const device = {
    mobile: `(max-width: ${size.mobile})`,
};

const color = {
    greenDefaultBtn: "#7EB496",
    greenHoverBtn: "#9FD3B6",
    greenFocusBtn: "#78AA8E",
    grayBtn: "#F9F8F9",
    grayHoverBtn: "#EDEDED",
    grayFocusBtn: "#DBDBDB",
};

const theme = {
    device,
    color,
};

export default theme;
