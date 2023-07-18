// selectors
const toggles = document.querySelectorAll(".settings [type='checkbox']");
const radios = document.querySelectorAll(".settings [type='radio']");
const audioCheck = document.querySelector("#audio-check");
const audioToggle = document.querySelector("#audio-toggle");
const doc = document.documentElement;

let isAudioPlayable;

// settings with defaults
const settings = [
  {
    key: "sound",
    default: "false",
  },
  {
    key: "motion",
    default: "true",
  },
  {
    key: "round",
    default: "false",
  },
  {
    key: "theme",
    default: "system",
  },
  {
    key: "customColor",
    default: "accent2",
  },
];

// functions
function updateSettingsUi({ name, value }) {
  if (value === "true" || value === "false") {
    const checkbox = document.querySelector(`[name="${name}"]`);
    return (checkbox.checked = value === "true" ? true : false);
  }
}

function updateSiteUi({ name, value }) {
  if (name === "customColor") {
    return doc.style.setProperty("--customColor", `var(--${value})`);
  }
  return (doc.dataset[name] = value);
}

function playAudio(type) {
  if (isAudioPlayable) {
    const audioSound = type === "check" ? audioCheck : audioToggle;
    // restart audio as soon as clicked on
    audioSound.currentTime = 0;
    audioSound.play();
  }
}

// event listeners
window.addEventListener("DOMContentLoaded", () => {
  settings.forEach((setting) => {
    const value = localStorage.getItem(setting.key) ?? setting.default;
    updateSiteUi({ name: setting.key, value });
    updateSettingsUi({ name: setting.key, value });
  });
});

toggles.forEach((toggle) => {
  toggle.addEventListener("change", (e) => {
    const { name, checked } = e.target;
    updateSiteUi({ name, value: checked });
    localStorage.setItem(name, checked);
    if (name === "sound") {
      isAudioPlayable = checked;
    }
    playAudio("toggle");
  });
});

radios.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const { name, id } = e.target;
    updateSiteUi({ name, value: id });
    localStorage.setItem(name, id);
    playAudio("check");
  });
});
