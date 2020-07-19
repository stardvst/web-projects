        window.addEventListener('load', function () {
            document.body.classList.remove('no-custom');
            document.body.classList.add('custom');
        });

        NodeList.prototype.forEach = function (callback) {
            Array.prototype.forEach.call(this, callback);
        }

        // build event callbacks
        function deactivateSelect(select) {
            if (!select.classList.contains('active')) return;

            var optionsList = select.querySelector('.optionsList');
            optionsList.classList.add('hidden');
            select.classList.remove('active');
        }

        function activateSelect(select, selectList) {
            if (select.classList.contains('active')) return;

            selectList.forEach(deactivateSelect);
            select.classList.add('active');
        }

        function toggleOptionsList(select) {
            var optionsList = select.querySelector('.optionsList');
            optionsList.classList.toggle('hidden');
        }

        function highlightOption(select, option) {
            var optionsList = select.querySelectorAll('.option');
            optionsList.forEach(function (option) {
                option.classList.remove('highlight');
            });

            option.classList.add('highlight');
        }

        // handling widget value
        function updateValue(select, index) {
            var nativeWidget = select.previousElementSibling;
            nativeWidget.selectedIndex = index;

            var optionsList = select.querySelectorAll('[role="option"]');
            optionsList.forEach(function (option) {
                option.setAttribute('aria-selected', 'false');
            });
            optionsList[index].setAttribute('aria-selected', 'true');

            var value = select.querySelector('.value');
            value.innerHTML = optionsList[index].innerHTML;
            highlightOption(select, optionsList[index]);
        }

        function getIndex(select) {
            var nativeWidget = select.previousElementSibling;
            return nativeWidget.selectedIndex;
        }

        // register callbacks
        window.addEventListener('load', function () {
            var selectList = document.querySelectorAll('.select');
            selectList.forEach(function (select) {
                var optionsList = select.querySelectorAll('.option'), selectedIndex = getIndex(select);

                select.tabIndex = 0;
                select.previousElementSibling.tabIndex = -1;

                updateValue(select, selectedIndex);

                optionsList.forEach(function (option, index) {
                    option.addEventListener('click', function (event) {
                        updateValue(select, index);
                    });
                    option.addEventListener('mouseover', function (event) {
                        highlightOption(select, option);
                    });
                });

                select.addEventListener('click', function (event) {
                    toggleOptionsList(select);
                });

                select.addEventListener('focus', function (event) {
                    activateSelect(select, selectList);
                })

                select.addEventListener('blur', function (event) {
                    deactivateSelect(select);
                });

                select.addEventListener('keyup', function (event) {
                    if (event.keyCode === 27) {
                        deactivateSelect(select);
                    }

                    var length = optionsList.length, index = getIndex(select);

                    if (event.keyCode === 40 && index < length - 1) {
                        ++index;
                    }

                    if (event.keyCode === 38 && index > 0) {
                        --index;
                    }

                    updateValue(select, index);
                });
            })
        });
