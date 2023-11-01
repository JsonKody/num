/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      cursor: {
        default: `url("data:image/svg+xml,%0A%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.87129 6.18093C8.79762 6.49876 8.81427 6.83083 8.91932 7.13966L12.6675 18.3842C12.6677 18.3848 12.6679 18.3854 12.6681 18.3859C12.7833 18.7353 13.0058 19.0395 13.3038 19.2553C13.6023 19.4714 13.9615 19.5877 14.33 19.5877C14.6985 19.5877 15.0577 19.4714 15.3562 19.2553C15.6542 19.0395 15.8767 18.7353 15.9919 18.3859C15.9921 18.3854 15.9923 18.3848 15.9925 18.3842L17.5511 13.7086C17.5511 13.7084 17.5512 13.7082 17.5512 13.7081C17.5635 13.6716 17.5841 13.6385 17.6113 13.6113C17.6385 13.5841 17.6716 13.5635 17.7081 13.5512C17.7082 13.5512 17.7084 13.5511 17.7086 13.5511L22.3842 11.9925C22.3848 11.9923 22.3854 11.9921 22.386 11.9919C22.7353 11.8767 23.0395 11.6542 23.2553 11.3562C23.4714 11.0577 23.5878 10.6985 23.5878 10.33C23.5878 9.96146 23.4714 9.60232 23.2553 9.30378C23.0395 9.00575 22.7353 8.78332 22.3859 8.66808C22.3854 8.66789 22.3848 8.66769 22.3842 8.6675L11.1397 4.91932C10.8308 4.81426 10.4988 4.79761 10.1809 4.87128C9.86198 4.94521 9.57016 5.10714 9.33865 5.33865C9.10714 5.57016 8.94522 5.86198 8.87129 6.18093Z' fill='%23FDD0FE' stroke='black' stroke-width='1.5'/%3E%3C/svg%3E%0A") 7 3, default`,
        pointer: `url("data:image/svg+xml,%0A%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.58621 11.4375C2.55172 10.9062 1.51724 11.4375 1.51724 11.4375L1 13.0312L2.03448 14.0938L2.55172 15.1562C2.55172 15.1562 2.41379 17.2812 5 18.875V21H16V18.875C16 16 17 17 17 15L17.0345 10.9062C17.0345 10.9062 17.0345 9 14 9.84375C14 9.84375 14 8 11 8.78125C11 8.78125 11 7 8 7.98438V5.0625C8 5.0625 7.58097 4 6.5 4C5.41903 4 5 5.0625 5 5.0625V12.5L3.58621 11.4375Z' fill='%23FEDFFF'/%3E%3Cpath d='M6.5 4C5.41903 4 5 5.0625 5 5.0625V12.5L3.58621 11.4375C2.55172 10.9062 1.51724 11.4375 1.51724 11.4375L1 13.0312L2.03448 14.0938L2.55172 15.1562C2.55172 15.1562 2.41379 17.2812 5 18.875V21H16V18.875C16 16 17 17 17 15L17.0345 10.9062C17.0345 10.9062 17.0345 9 14 9.84375M6.5 4C7.58097 4 5.41903 4 6.5 4ZM6.5 4C7.58097 4 8 5.0625 8 5.0625V7.98438M8 11.4375V7.98438M8 7.98438C11 7 11 8.78125 11 8.78125M11 8.78125V11.4375M11 8.78125C14 8 14 9.84375 14 9.84375M14 9.84375V12.5' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A") 7 3, default`,
        help: `url("data:image/svg+xml,%0A%3Csvg width='40' height='35' viewBox='0 0 40 35' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.87129 5.18093C7.79762 5.49876 7.81427 5.83083 7.91932 6.13966L11.6675 17.3842C11.6677 17.3848 11.6679 17.3854 11.6681 17.3859C11.7833 17.7353 12.0058 18.0395 12.3038 18.2553C12.6023 18.4714 12.9615 18.5877 13.33 18.5877C13.6985 18.5877 14.0577 18.4714 14.3562 18.2553C14.6542 18.0395 14.8767 17.7353 14.9919 17.3859C14.9921 17.3854 14.9923 17.3848 14.9925 17.3842L16.5511 12.7086C16.5511 12.7084 16.5512 12.7082 16.5512 12.7081C16.5635 12.6716 16.5841 12.6385 16.6113 12.6113C16.6385 12.5841 16.6716 12.5635 16.7081 12.5512C16.7082 12.5512 16.7084 12.5511 16.7086 12.5511L21.3842 10.9925C21.3848 10.9923 21.3854 10.9921 21.386 10.9919C21.7353 10.8767 22.0395 10.6542 22.2553 10.3562C22.4714 10.0577 22.5878 9.69854 22.5878 9.33C22.5878 8.96146 22.4714 8.60232 22.2553 8.30378C22.0395 8.00575 21.7353 7.78332 21.3859 7.66808C21.3854 7.66789 21.3848 7.66769 21.3842 7.6675L10.1397 3.91932C9.83083 3.81426 9.49876 3.79761 9.18093 3.87128C8.86198 3.94521 8.57016 4.10714 8.33865 4.33865C8.10714 4.57016 7.94522 4.86198 7.87129 5.18093Z' fill='%23FDD0FE' stroke='black' stroke-width='1.5'/%3E%3Cpath d='M28 15V15.0143' stroke='black' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M28 15V15.0143' stroke='%23FDD0FE' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M25 6.70712C28.5 0.5 36.5 8.5 27.3864 11' stroke='black' stroke-width='4' stroke-linecap='round'/%3E%3Cpath d='M25 6.70712C28.5 0.5 36.5 8.5 27.3864 11' stroke='%23FDD0FE' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E%0A") 7 3, default`,
        switch: `url("data:image/svg+xml,%0A%3Csvg width='46' height='24' viewBox='0 0 46 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.87129 5.18093C7.79762 5.49876 7.81427 5.83083 7.91932 6.13966L11.6675 17.3842C11.6677 17.3848 11.6679 17.3854 11.6681 17.3859C11.7833 17.7353 12.0058 18.0395 12.3038 18.2553C12.6023 18.4714 12.9615 18.5877 13.33 18.5877C13.6985 18.5877 14.0577 18.4714 14.3562 18.2553C14.6542 18.0395 14.8767 17.7353 14.9919 17.3859C14.9921 17.3854 14.9923 17.3848 14.9925 17.3842L16.5511 12.7086C16.5511 12.7084 16.5512 12.7082 16.5512 12.7081C16.5635 12.6716 16.5841 12.6385 16.6113 12.6113C16.6385 12.5841 16.6716 12.5635 16.7081 12.5512C16.7082 12.5512 16.7084 12.5511 16.7086 12.5511L21.3842 10.9925C21.3848 10.9923 21.3854 10.9921 21.386 10.9919C21.7353 10.8767 22.0395 10.6542 22.2553 10.3562C22.4714 10.0577 22.5878 9.69854 22.5878 9.33C22.5878 8.96146 22.4714 8.60232 22.2553 8.30378C22.0395 8.00575 21.7353 7.78332 21.3859 7.66808C21.3854 7.66789 21.3848 7.66769 21.3842 7.6675L10.1397 3.91932C9.83083 3.81426 9.49876 3.79761 9.18093 3.87128C8.86198 3.94521 8.57016 4.10714 8.33865 4.33865C8.10714 4.57016 7.94522 4.86198 7.87129 5.18093Z' fill='%23FDD0FE' stroke='black' stroke-width='1.5'/%3E%3Cpath d='M39.75 7.66667L36.9167 5M36.9167 5L34.0833 7.66667M36.9167 5L36.9167 11M32.6667 13L29.8333 15.6667M29.8333 15.6667L27 13M29.8333 15.6667L29.8333 9' stroke='black' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M39.75 7.66667L36.9167 5M36.9167 5L34.0833 7.66667M36.9167 5L36.9167 11M32.6667 13L29.8333 15.6667M29.8333 15.6667L27 13M29.8333 15.6667L29.8333 9' stroke='%23FDD0FE' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A") 7 3, default`,
        text: `url("data:image/svg+xml,%0A%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 4C6.79565 4 7.55871 4.31607 8.12132 4.87868C8.68393 5.44129 9 6.20435 9 7M9 7V17M9 7C9 6.20435 9.31607 5.44129 9.87868 4.87868C10.4413 4.31607 11.2044 4 12 4M9 17C9 17.7956 8.68393 18.5587 8.12132 19.1213C7.55871 19.6839 6.79565 20 6 20M9 17C9 17.7956 9.31607 18.5587 9.87868 19.1213C10.4413 19.6839 11.2044 20 12 20' stroke='black' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M6 4C6.79565 4 7.55871 4.31607 8.12132 4.87868C8.68393 5.44129 9 6.20435 9 7M9 7V17M9 7C9 6.20435 9.31607 5.44129 9.87868 4.87868C10.4413 4.31607 11.2044 4 12 4M9 17C9 17.7956 8.68393 18.5587 8.12132 19.1213C7.55871 19.6839 6.79565 20 6 20M9 17C9 17.7956 9.31607 18.5587 9.87868 19.1213C10.4413 19.6839 11.2044 20 12 20' stroke='%23FDD0FE' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A") 7 3, default`,
      },
    },
  },
  plugins: [],
};
