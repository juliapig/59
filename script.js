const revealItems = document.querySelectorAll('.reveal');

window.lucide?.createIcons();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 80}ms`;
  observer.observe(item);
});

window.addEventListener('load', () => {
  if (!window.location.hash) return;

  const target = document.querySelector(window.location.hash);
  target?.scrollIntoView({ block: 'start' });
});

const tellingTabs = [...document.querySelectorAll('[data-telling-tab]')];

if (tellingTabs.length) {
  const activateTellingTab = (activeTab, moveFocus = true) => {
    tellingTabs.forEach((tab) => {
      const isActive = tab === activeTab;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
      document.querySelector(`#${tab.getAttribute('aria-controls')}`).hidden = !isActive;
    });

    if (moveFocus) activeTab.focus();
  };

  tellingTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTellingTab(tab, false));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

      event.preventDefault();
      const nextIndex = event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? tellingTabs.length - 1
          : (index + (event.key === 'ArrowRight' ? 1 : -1) + tellingTabs.length) % tellingTabs.length;
      activateTellingTab(tellingTabs[nextIndex]);
    });
  });
}

const projectGate = document.querySelector('[data-project-gate]');

if (projectGate) {
  const projectGateForm = projectGate.querySelector('[data-project-gate-form]');
  const projectPassword = projectGate.querySelector('[data-project-password]');
  const projectGateError = projectGate.querySelector('[data-project-gate-error]');
  const accessKey = 'julia-projects-access';

  const unlockProjects = () => {
    document.body.classList.remove('work-locked');
    projectGate.setAttribute('aria-hidden', 'true');
    document.querySelector('#selected-projects-title')?.focus({ preventScroll: true });
  };

  if (sessionStorage.getItem(accessKey) === 'granted') {
    unlockProjects();
  } else {
    projectPassword.focus();
  }

  projectGateForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (projectPassword.value === '0509') {
      sessionStorage.setItem(accessKey, 'granted');
      projectGateError.hidden = true;
      projectPassword.removeAttribute('aria-invalid');
      unlockProjects();
      return;
    }

    projectGateError.hidden = false;
    projectPassword.value = '';
    projectPassword.setAttribute('aria-invalid', 'true');
    projectPassword.focus();
  });
}

const tarotCards = [
  { roman: '0', english: 'The Fool', chinese: '愚者', symbol: '✦', upright: 'Begin lightly. Curiosity will take you farther than certainty today.', reversed: 'Pause before leaping. Freedom needs awareness to avoid becoming carelessness.' },
  { roman: 'I', english: 'The Magician', chinese: '魔术师', symbol: '☯', upright: 'Your tools are already in hand. Give one clear intention your full attention.', reversed: 'Your energy is scattered or misdirected. Return to an honest intention before acting.' },
  { roman: 'II', english: 'The High Priestess', chinese: '女祭司', symbol: '☾', upright: 'Listen beneath the noise. What feels quiet may carry the clearest answer.', reversed: 'Inner wisdom is being ignored. Make space for silence before seeking another opinion.' },
  { roman: 'III', english: 'The Empress', chinese: '皇后', symbol: '❀', upright: 'Nourish what is growing. Beauty and care are productive forces today.', reversed: 'Care for yourself before giving more away. Creative energy returns through rest.' },
  { roman: 'IV', english: 'The Emperor', chinese: '皇帝', symbol: '山', upright: 'Create structure around what matters. A firm boundary can bring calm.', reversed: 'Control has become too rigid, or structure is missing. Lead with steadiness rather than force.' },
  { roman: 'V', english: 'The Hierophant', chinese: '教皇', symbol: '門', upright: 'A trusted practice or teacher may reveal a useful path forward.', reversed: 'Question the inherited rule. Your own experience may offer a more truthful path.' },
  { roman: 'VI', english: 'The Lovers', chinese: '恋人', symbol: '∞', upright: 'Choose in alignment with your values, not merely with convenience.', reversed: 'A choice is out of alignment. Reconnect with your values before seeking agreement.' },
  { roman: 'VII', english: 'The Chariot', chinese: '战车', symbol: '馬', upright: 'Movement comes from directing opposing energies toward one purpose.', reversed: 'Pushing harder will not restore direction. Regain focus before gathering speed.' },
  { roman: 'VIII', english: 'Strength', chinese: '力量', symbol: '虎', upright: 'Meet intensity with patience. Gentle courage is your strongest response.', reversed: 'Self-doubt is draining your courage. Offer yourself the compassion you would give another.' },
  { roman: 'IX', english: 'The Hermit', chinese: '隐者', symbol: '灯', upright: 'Step back long enough to hear your own wisdom before seeking more input.', reversed: 'Solitude has become isolation. Let one trusted person bring perspective back in.' },
  { roman: 'X', english: 'Wheel of Fortune', chinese: '命运之轮', symbol: '轮', upright: 'The pattern is turning. Stay flexible and notice the opening within change.', reversed: 'Resistance is making change feel heavier. Work with what is turning instead of gripping the past.' },
  { roman: 'XI', english: 'Justice', chinese: '正义', symbol: '衡', upright: 'Look clearly at cause and effect. An honest choice restores balance.', reversed: 'Something is being avoided or judged unfairly. Begin by telling yourself the complete truth.' },
  { roman: 'XII', english: 'The Hanged Man', chinese: '倒吊人', symbol: '水', upright: 'Pause the usual approach. A changed perspective can loosen the knot.', reversed: 'Waiting has become stagnation. Release the need for perfect certainty and make one small move.' },
  { roman: 'XIII', english: 'Death', chinese: '死神', symbol: '叶', upright: 'Release what has completed its season. Space is forming for renewal.', reversed: 'An ending is being resisted. Letting go gradually is still letting go.' },
  { roman: 'XIV', english: 'Temperance', chinese: '节制', symbol: '泉', upright: 'Blend rather than force. Small adjustments will create lasting harmony.', reversed: 'Your rhythm is out of balance. Reduce the extremes and return to a sustainable pace.' },
  { roman: 'XV', english: 'The Devil', chinese: '恶魔', symbol: '链', upright: 'Name the attachment clearly. Awareness is the first opening in the chain.', reversed: 'A binding pattern is losing its power. Keep choosing the freedom you have begun to notice.' },
  { roman: 'XVI', english: 'The Tower', chinese: '高塔', symbol: '雷', upright: 'A brittle structure may shift. Let truth clear what cannot support you.', reversed: 'You sense necessary change but keep postponing it. A deliberate release can soften the upheaval.' },
  { roman: 'XVII', english: 'The Star', chinese: '星星', symbol: '星', upright: 'Hope becomes practical when you follow the smallest point of light.', reversed: 'Discouragement is hiding the horizon. Tend one quiet source of renewal today.' },
  { roman: 'XVIII', english: 'The Moon', chinese: '月亮', symbol: '月', upright: 'Not everything needs to be resolved tonight. Move gently through uncertainty.', reversed: 'Confusion is beginning to lift. Separate intuition from fear as the details emerge.' },
  { roman: 'XIX', english: 'The Sun', chinese: '太阳', symbol: '日', upright: 'Let yourself be visible. Warmth, clarity, and honest joy are available.', reversed: 'Joy is present but partially blocked. Lower the expectation and notice the simple warmth nearby.' },
  { roman: 'XX', english: 'Judgement', chinese: '审判', symbol: '鸣', upright: 'Answer the call to become more fully yourself. The past has taught enough.', reversed: 'Harsh self-judgement is delaying renewal. Learn from the past without sentencing yourself to it.' },
  { roman: 'XXI', english: 'The World', chinese: '世界', symbol: '圆', upright: 'A cycle finds completion. Honor the whole journey before beginning again.', reversed: 'Completion is close, but one loose end needs attention. Finish with care before moving on.' },
];

const tarotStage = document.querySelector('[data-tarot-stage]');

if (tarotStage) {
  const anticipationDuration = 1600;
  const flipDuration = 2400;
  const tarotCard = tarotStage.querySelector('[data-tarot-card]');
  const drawButton = tarotStage.querySelector('[data-draw-button]');
  const result = document.querySelector('[data-reading-result]');
  const drawAgain = document.querySelector('[data-draw-again]');
  const alternateReading = document.querySelector('[data-alternate-reading]');
  const alternateReadingTrigger = document.querySelector('[data-alternate-reading-trigger]');
  const alternateReadingTooltip = document.querySelector('[data-alternate-reading-tooltip]');
  let lastCardIndex = -1;

  const drawCard = () => {
    drawButton.classList.remove('is-hovered');
    let cardIndex;
    do {
      cardIndex = Math.floor(Math.random() * tarotCards.length);
    } while (cardIndex === lastCardIndex && tarotCards.length > 1);

    lastCardIndex = cardIndex;
    const card = tarotCards[cardIndex];
    const isReversed = Math.random() < 0.5;
    const orientation = isReversed ? 'Reversed' : 'Upright';

    tarotCard.querySelector('[data-card-roman]').textContent = card.roman;
    tarotCard.querySelector('[data-card-symbol]').textContent = card.symbol;
    tarotCard.querySelector('[data-card-chinese]').textContent = card.chinese;
    tarotCard.querySelector('[data-card-english]').textContent = card.english;
    result.querySelector('[data-result-chinese]').textContent = card.chinese;
    result.querySelector('[data-result-english]').textContent = card.english;
    result.querySelector('[data-result-reading]').textContent = isReversed ? card.reversed : card.upright;
    alternateReadingTrigger.textContent = isReversed ? 'View upright meaning' : 'View reversed meaning';
    alternateReadingTooltip.textContent = isReversed ? card.upright : card.reversed;
    alternateReading.classList.remove('is-open');
    alternateReadingTrigger.setAttribute('aria-expanded', 'false');
    const orientationLabel = result.querySelector('[data-result-orientation]');
    orientationLabel.textContent = orientation;
    orientationLabel.classList.toggle('is-reversed', isReversed);

    tarotStage.classList.add('has-drawn');
    tarotStage.classList.add('is-drawing');

    window.setTimeout(() => {
      tarotStage.classList.remove('is-drawing');
      tarotCard.classList.toggle('is-reversed', isReversed);
      tarotCard.classList.add('is-revealed');
    }, anticipationDuration);

    window.setTimeout(() => {
      result.hidden = false;
    }, anticipationDuration + flipDuration);
  };

  drawButton.addEventListener('pointerenter', () => {
    drawButton.classList.add('is-hovered');
  });
  drawButton.addEventListener('pointerleave', () => {
    drawButton.classList.remove('is-hovered');
  });
  drawButton.addEventListener('click', drawCard);
  alternateReadingTrigger.addEventListener('pointerenter', () => {
    alternateReading.classList.add('is-hovered');
  });
  alternateReadingTrigger.addEventListener('pointerleave', () => {
    alternateReading.classList.remove('is-hovered');
  });

  alternateReadingTrigger.addEventListener('click', () => {
    const isOpen = alternateReading.classList.toggle('is-open');
    alternateReadingTrigger.setAttribute('aria-expanded', String(isOpen));
  });

  drawAgain.addEventListener('click', () => {
    tarotCard.classList.remove('is-revealed');
    result.hidden = true;
    alternateReading.classList.remove('is-open');
    alternateReadingTrigger.setAttribute('aria-expanded', 'false');

    window.setTimeout(() => {
      tarotCard.classList.remove('is-reversed');
      tarotStage.classList.remove('has-drawn');
      drawButton.focus();
    }, flipDuration);
  });
}

const threeCardReading = document.querySelector('[data-three-card-reading]');

if (threeCardReading) {
  const positions = ['Past', 'Present', 'Future'];
  const spreadDeck = threeCardReading.querySelector('[data-spread-deck]');
  const spreadStatus = threeCardReading.querySelector('[data-three-card-status]');
  const threeCardPrompt = threeCardReading.querySelector('[data-three-card-prompt]');
  const spreadReveal = threeCardReading.querySelector('[data-spread-reveal]');
  const spreadResult = threeCardReading.querySelector('[data-spread-result]');
  const spreadResultGrid = threeCardReading.querySelector('[data-spread-result-grid]');
  const spreadReset = threeCardReading.querySelector('[data-spread-reset]');
  const readingQuestion = threeCardReading.querySelector('[data-reading-question]');
  const questionEcho = threeCardReading.querySelector('[data-spread-question-echo]');
  let selectedCards = [];

  const deckCards = [...tarotCards]
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);

  deckCards.forEach((card, index) => {
    const button = document.createElement('button');
    button.className = 'spread-card';
    button.type = 'button';
    button.dataset.cardIndex = String(index);
    button.setAttribute('aria-label', `Choose card ${index + 1}`);
    button.setAttribute('aria-pressed', 'false');
    button.style.setProperty('--card-index', String(index));
    spreadDeck.append(button);
  });

  const updateSpreadSelection = () => {
    const remaining = 3 - selectedCards.length;
    spreadStatus.textContent = remaining === 0 ? 'Your three cards are ready' : `Choose ${remaining} more card${remaining === 1 ? '' : 's'}`;
    threeCardPrompt.hidden = selectedCards.length !== 3;
    spreadDeck.querySelectorAll('.spread-card').forEach((button) => {
      button.disabled = selectedCards.length === 3 && button.getAttribute('aria-pressed') !== 'true';
    });
  };

  spreadDeck.addEventListener('click', (event) => {
    const button = event.target.closest('.spread-card');
    if (!button) return;

    const cardIndex = Number(button.dataset.cardIndex);
    const selectedIndex = selectedCards.indexOf(cardIndex);
    if (selectedIndex >= 0) {
      selectedCards.splice(selectedIndex, 1);
      button.setAttribute('aria-pressed', 'false');
    } else if (selectedCards.length < 3) {
      selectedCards.push(cardIndex);
      button.setAttribute('aria-pressed', 'true');
    }

    updateSpreadSelection();
  });

  spreadReveal.addEventListener('click', () => {
    if (selectedCards.length !== 3) return;

    const question = readingQuestion.value.trim();
    questionEcho.textContent = question ? `“${question}”` : '';
    questionEcho.hidden = !question;
    spreadResultGrid.replaceChildren();

    selectedCards.forEach((cardIndex, index) => {
      const card = deckCards[cardIndex];
      const isReversed = Math.random() < 0.5;
      const resultCard = document.createElement('article');
      resultCard.className = `spread-result-item spread-result-item-${index + 1}`;
      resultCard.innerHTML = `
        <p class="spread-result-position">${positions[index]}</p>
        <div class="spread-result-card${isReversed ? ' is-reversed' : ''}" role="group" aria-label="${card.english}, ${isReversed ? 'reversed' : 'upright'}">
          <span class="spread-result-roman">${card.roman}</span>
          <div class="spread-result-art" aria-hidden="true"><span>${card.symbol}</span></div>
          <h3>${card.chinese}<span>${card.english}</span></h3>
        </div>
        <p class="spread-result-orientation">${isReversed ? 'Reversed' : 'Upright'}</p>
        <p class="spread-result-meaning">${isReversed ? card.reversed : card.upright}</p>
      `;
      spreadResultGrid.append(resultCard);
    });

    threeCardReading.querySelector('[data-three-card-picker]').hidden = true;
    spreadResult.hidden = false;
    spreadResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    spreadReset.focus({ preventScroll: true });
  });

  spreadReset.addEventListener('click', () => {
    selectedCards = [];
    spreadDeck.querySelectorAll('.spread-card').forEach((button) => {
      button.disabled = false;
      button.setAttribute('aria-pressed', 'false');
    });
    spreadResult.hidden = true;
    threeCardReading.querySelector('[data-three-card-picker]').hidden = false;
    threeCardPrompt.hidden = true;
    readingQuestion.value = '';
    updateSpreadSelection();
    spreadDeck.querySelector('.spread-card')?.focus();
  });

  updateSpreadSelection();
}
