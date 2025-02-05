document.addEventListener('DOMContentLoaded', () => {
    const fakeInputs = document.querySelectorAll('.fake_form_inputs_wrapper input');
    const realInputs = document.querySelectorAll('.form-page-wrapper .elementor-form-fields-wrapper input');
    const fakeSelects = document.querySelectorAll('.fake_form_inputs_wrapper select');
    const realSelects = document.querySelectorAll('.form-page-wrapper .elementor-form-fields-wrapper select');
    const formSubmitButton = document.querySelector('.form-submit-button');
    const realForm = document.querySelector('.form-page-wrapper form');
    const widgetWrap = document.querySelector('.fake_form_wrapper .elementor-widget-wrap');
  
    if (fakeInputs && realInputs && formSubmitButton && realForm && widgetWrap) {
        if (fakeInputs.length !== realInputs.length) {
            console.log('+');
        }
  
        fakeInputs.forEach((fakeInput, index) => {
            const realInput = realInputs[index];
        
            if (fakeInput.type === 'checkbox') {

                fakeInput.addEventListener('change', () => {
                    realInput.checked = fakeInput.checked;
                });

            } else if (fakeInput.type === 'number') {
                fakeInput.addEventListener('input', (event) => {
                    let value = parseInt(event.target.value, 10); 
                    
                    if (value < 1) {
                        event.target.value = 1;  
                        value = 1;
                        realInput.value = value;
                        console.log('+');
                    }
                    
                    if (value > 31) {
                        event.target.value = 31; 
                        value = 31;
                        realInput.value = value;
                        console.log('+');
                    }
            
                    realInput.value = event.target.value;
                });
            } else {
                fakeInput.addEventListener('input', (event) => {
                    realInput.value = event.target.value;
                    if (fakeInput.type === 'email') {
                        if (isValidEmail(fakeInput.value)) {
                            fakeInput.style.border = '';
                        }
                    } else {
                        if (fakeInput.value.trim()) {
                            fakeInput.style.border = '';
                        }
                    }
                });
            }
        });
  
  
        fakeSelects.forEach((fakeSelect, index) => {
            const realSelect = realSelects[index];
            fakeSelect.addEventListener('change', () => {
                realSelect.value = fakeSelect.value;
            });
        });
  
        formSubmitButton.addEventListener('click', (event) => {
            let allFieldsValid = true;
            let firstInvalidField = null;
    
            fakeInputs.forEach((input) => {
                input.style.border = '';
                if (input.required && input.type === 'checkbox' && !input.checked) {
                    if (!firstInvalidField) firstInvalidField = input;
                    allFieldsValid = false;
                }

                if (input.required && input.type !== 'checkbox' && !input.value.trim()) {
                    if (!firstInvalidField) firstInvalidField = input;
                    allFieldsValid = false;
                }

                if (input.type === 'email' && !isValidEmail(input.value)) {
                    if (!firstInvalidField) firstInvalidField = input;
                    allFieldsValid = false;
                }
            });
    
            fakeSelects.forEach((select) => {
                if (select.required && !select.value) {
                    if (!firstInvalidField) firstInvalidField = select;
                    allFieldsValid = false;
                }
            });
    
            if (allFieldsValid) {
                realForm.querySelector('button').click();

                fakeInputs.forEach(input => {
                    input.value = '';
                    if (input.type === 'checkbox') {
                        input.checked = false;
                    }
                    input.style.border = '';
                });

                fakeSelects.forEach(select => {
                    select.value = '';
                });

                const successMessageContainer = document.createElement('div');
                successMessageContainer.classList.add('form-success-message');
                successMessageContainer.textContent = 'Form submitted successfully! Thank you for your response.';
                widgetWrap.appendChild(successMessageContainer);

                successMessageContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                event.preventDefault();
    
                if (firstInvalidField) {
                    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstInvalidField.focus();

                    firstInvalidField.style.setProperty('border', '2px solid red', 'important');

                    if (firstInvalidField.type === 'email') {
                        alert('Please enter a valid email address.');
                    } else {
                        alert('Please fill out this field.');
                    }
                }
            }

        });
    }
  
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
  
});
  