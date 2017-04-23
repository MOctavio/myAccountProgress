const appController = (function AppController() {
    const DOMSelector = {
        close: '.js-close-modal',
        open: '.js-open-modal',
        modal: '.js-modal',
        progress: '.js-progress',
        progressTooltip: '.js-progress-tooltip',
        progressValue: '.js-progress-value',
        reached: '.js-reached',
        target: '.js-target',
        targetLabel: '.js-target-label',
        targetLeft: '.js-target-left'
    };

    function setupEventListeners() {
        document.querySelector(DOMSelector.close).addEventListener('click', closeModal);
        document.querySelector(DOMSelector.open).addEventListener('click', openModal);
        document.addEventListener('keydown', function(event) {
            if (event.keyCode == 27) {
                closeModal(event);
            }
        });
    }

    function closeModal(event) {
        event.preventDefault();
        event.stopPropagation();
        document.querySelector(DOMSelector.modal).style.display = 'none';
    }

    function openModal(event) {
        event.preventDefault();
        event.stopPropagation();
        document.querySelector(DOMSelector.modal).style.display = 'block';
        setValues();
    }

    function setValues() {
        let reached = document.querySelector(DOMSelector.reached).value;
        let target = document.querySelector(DOMSelector.target).value;

        document.querySelector(DOMSelector.targetLabel).innerHTML = target;
        document.querySelector(DOMSelector.targetLeft).innerHTML = target-reached;
        document.querySelector(DOMSelector.progressValue).innerHTML = reached;
        reached = Math.round(reached / target * 100);
        document.querySelector(DOMSelector.progressTooltip).style.paddingLeft = 250 * (reached / 100) + 'px';

        setTimeout(function () {
            document.querySelector(DOMSelector.progress).style.width = reached + '%';
        },200);
    }

    function _init() {
        setupEventListeners();
    }

    return {init: _init};
})();

appController.init();
