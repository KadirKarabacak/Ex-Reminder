import { createGlobalStyle } from 'styled-components';

// Instead of using external file, we create global presets here.
const GlobalStyles = createGlobalStyle`
:root {

  &, &.light-mode{
    --color-grey-0: #fff;
    --color-grey-50: #f9fafb;
    --color-grey-100: #f3f4f6;
    --color-grey-200: #e5e7eb;
    --color-grey-300: #d1d5db;
    --color-grey-400: #9ca3af;
    --color-grey-500: #6b7280;
    --color-grey-600: #4b5563;
    --color-grey-700: #374151;
    --color-grey-800: #1f2937;
    --color-grey-900: #111827;
    
    --color-blue-100: #e0f2fe;
    --color-blue-700: #0369a1;

    --color-green-100: #dcfce7;
    --color-green-700: #15803d;

    --color-yellow-100: #fef9c3;
    --color-yellow-700: #a16207;

    --color-silver-100: #e5e7eb;
    --color-silver-700: #374151;

    --color-indigo-100: #e0e7ff;
    --color-indigo-700: #4338ca;
    
    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;
    
    --backdrop-color: rgba(255, 255, 255, 0.1);
    
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

    --image-grayscale: 0;
    --image-opacity: 100%;

    --color-grey-50-forms: rgba(249, 250, 251, 0.98);
    --shadow-badge: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }
    
    &.dark-mode{
    --color-grey-0: #18212f;
    --color-grey-50: #111827;
    --color-grey-100: #1f2937;
    --color-grey-200: #374151;
    --color-grey-300: #4b5563;
    --color-grey-400: #6b7280;
    --color-grey-500: #9ca3af;
    --color-grey-600: #d1d5db;
    --color-grey-700: #e5e7eb;
    --color-grey-800: #f3f4f6;
    --color-grey-900: #f9fafb;

    --color-blue-100: #075985;
    --color-blue-700: #e0f2fe;

    --color-green-100: #166534;
    --color-green-700: #dcfce7;

    --color-yellow-100: #854d0e;
    --color-yellow-700: #fef9c3;

    --color-silver-100: #374151;
    --color-silver-700: #f3f4f6;

    --color-indigo-100: #3730a3;
    --color-indigo-700: #e0e7ff;

    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    --backdrop-color: rgba(0, 0, 0, 0.3);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 2rem 3.2rem rgba(0, 0, 0, 0.4);

    --image-grayscale: 10%;
    --image-opacity: 90%;

    --color-grey-50-forms: rgba(17, 24, 39, 0.98);
    --shadow-badge: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

   /* Indigo */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;

  --color-green-new: #1F994D;
  --color-green-lighter: #25b35b;
  --color-white-soft: #FBFAF5;
  --color-border-soft: #f3f4f6;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: "DM Sans", sans-serif !important;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);
  transition: color 0.3s, background-color 0.3s;
  min-height: 100dvh;
  line-height: 1.5;
  font-size: 1.6rem;
  overflow: unset!important;
  /* overflow: hidden; */
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
  
}

input:disabled, label:disabled {
  background-color: var(--color-grey-200)!important;
  color: var(--color-grey-500)!important;
  -webkit-text-fill-color: var(--color-grey-500)!important;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--color-grey-600); 
    -webkit-box-shadow: 0 0 0px 1000px transparent inset; /* Arka planı şeffaf yapar */
    transition: background-color 5000s ease-in-out 0s;
}


/* textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
} */

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

svg{
  color: var(--color-grey-800);
}

/* ::selection{
  color: var(--color-green-lighter);
} */

.Mui-active{
  color:  var(--color-grey-800)!important;
}

.MuiTooltip-tooltip{
  font-size: 1.2rem !important;
  max-width: 60rem!important;
  padding: 10px 12px!important;
  background-color: var(--color-grey-200)!important;
  color: var(--color-grey-800)!important;
  box-shadow: var(--shadow-md)!important;
}

.MuiTooltip-arrow{
  color: var(--color-grey-200)!important;
}

.MuiPickersDay-root{
  font-size: 1rem !important;
  font-family: "DM Sans", sans-serif !important;
}


.MuiTablePagination-root{
  border-bottom: none !important;
}

.MuiFilledInput-root::after{
  border-bottom: 2px solid var(--color-brand-500)!important;
}

.MuiSelect-icon{
  color: var(--color-grey-800)!important;
}

/* DOESNT WORK */
.css-o943dk-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
  color: var(--color-brand-500)!important;
}

.css-1eq3xk-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
  color: var(--color-brand-500)!important;
}

.MuiPickersArrowSwitcher-root .MuiButtonBase-root .MuiSvgIcon-root{
  color: #101010!important;
}

.MuiPickersCalendarHeader-labelContainer .MuiButtonBase-root svg{
  color: #101010!important;
}

.MuiPaper-root .MuiList-root .MuiMenuItem-root{
  font-size: 1.2rem!important;
}

.MuiList-root {
  max-height: 29rem;
}

/* Örnek olarak Marker'ın stili */
.leaflet-marker-icon {

}

.leaflet-popup-close-button{
  color: var(--color-grey-900)!important;
  font: 2rem DM Sans, sans serif !important;
}

.leaflet-popup-content-wrapper {
  background: var(--color-grey-100);
  border-radius: var(--border-radius-sm)!important;
}

.leaflet-popup-tip{
  background: var(--color-grey-100);
}

.MuiDayCalendar-weekContainer > .Mui-selected{
  background-color: var(--color-green-new)!important;
}

.MuiMultiSectionDigitalClockSection-root .Mui-selected{
  background-color: var(--color-green-new)!important;
}

.MuiPickersLayout-actionBar > button {
  background-color: var(--color-green-new);
  color: var(--color-white-soft);
}

.MuiPickersLayout-actionBar > button:hover {
  background-color: var(--color-green-lighter);
  color: var(--color-white-soft);
}

.recharts-curve{
  fill: var(--color-green-new)!important;
}

.MuiBadge-badge{
  font-size: 1rem!important;
  animation: pulse 3s infinite;
    @keyframes pulse {
        0% {
            box-shadow: var(--shadow-badge);
        }

        70% {
            box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
        }

        100% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        }
    }
}

.recharts-default-legend{
  background-color: rgba(0,0,0, 0.1)!important;
  border: 1px solid rgba(0,0,0, 0.2)!important;
  box-shadow: var(--shadow-sm);
  padding: 10px!important;
  border-radius: 5px!important;
}

.square {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 50px;
	height: 50px;
	background: var(--color-brand-500);
	z-index: 2;
  box-shadow: var(--shadow-md);
}

.circle {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 50px;
	height: 50px;
	background: var(--color-green-lighter);
	border-radius: 50%;
  box-shadow: var(--shadow-md);
}

.triangle {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 50px;
	height: 50px;
	background: var(--color-grey-800);
	clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
	-webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  box-shadow: var(--shadow-md);
}

.react-joyride__overlay{
  /* height: 100dvh!important; */
  background-color: rgba(0,0,0,0.5)!important;
}

.__floater{
  height: auto!important;
}

.react-joyride__spotlight{
  pointer-events: none !important;
}

.react-joyride__beacon > span:nth-child(1){
  animation: pulse 3s infinite!important;
  opacity: 1!important;
  width: 24px !important;
  height: 24px !important;
  z-index: 1000!important;

    @keyframes pulse {
        0% {
            box-shadow: var(--shadow-badge);
        }

        70% {
            box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
        }

        100% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        }
    }
}
.react-joyride__beacon > span:nth-child(2){
  animation: none!important;
  border: none!important;
  opacity: 1!important;
}

.__floater + span {
  z-index: 10000!important;
}

.__floater__body > div > button {
  padding: 1.2rem!important;
}

.MuiButtonBase-root .Mui-checked{
 color: var(--color-green-new)!important;
}

.MuiButtonBase-root .Mui-checked + .MuiSwitch-track{
  background-color: var(--color-green-new)!important;
}

.EZDrawer__overlay{
  z-index: 28000!important;
}

.MuiModal-root{
  z-index: 99999999999!important;
}

.base-Popper-root {
  z-index: 5000000000!important;
}


*::-webkit-scrollbar {
  height:9px;
  width:9px;
}
*::-webkit-scrollbar-track {
  border-radius: 0px;
  background-color: var(--color-grey-300);
}

*::-webkit-scrollbar-track:hover {
  background-color: var(--color-grey-300);
}

*::-webkit-scrollbar-track:active {
  background-color: var(--color-grey-300);
}

*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: var(--color-green-lighter);
}

*::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-green-lighter);
}

*::-webkit-scrollbar-thumb:active {
  background-color: var(--color-green-lighter);
}

::selection {
  color: var(--color-white-soft);
  background-color: var(--color-green-lighter);
}

`;

export default GlobalStyles;
