var appController = (function AppController() {
    var DOMSelector = {
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
        // Reset initial values
        document.querySelector(DOMSelector.modal).style.display = 'none';
        document.querySelector(DOMSelector.progress).style.width = '';
    }

    function openModal(event) {
        event.preventDefault();
        event.stopPropagation();
        document.querySelector(DOMSelector.modal).style.display = 'block';
        setValues();
    }

    function setValues() {
        var reached = parseFloat(document.querySelector(DOMSelector.reached).value);
        var target = parseFloat(document.querySelector(DOMSelector.target).value);

        // Fail save for max values
        if (reached > target) reached = target;

        document.querySelector(DOMSelector.targetLabel).innerHTML = target;
        document.querySelector(DOMSelector.targetLeft).innerHTML = target - reached;
        document.querySelector(DOMSelector.progressValue).innerHTML = reached;
        reached = Math.round(reached / target * 100);
        document.querySelector(DOMSelector.progressTooltip).style.paddingLeft = 250 * (reached / 100) + 'px';

        setTimeout(function() {
            document.querySelector(DOMSelector.progress).style.width = reached + '%';
        }, 200);
    }

    function _init() {
        setupEventListeners();
    }

    return {init: _init};
})();

appController.init();
