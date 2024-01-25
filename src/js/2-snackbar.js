import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();

    options.delay = formRef.elements.delay.value;
    if (formRef.elements.state.value === 'fulfilled') {
        options.shouldResolve = true;
        options.value = `✅ Fulfilled promise in ${options.delay}ms`;
    } else {
        options.shouldResolve = false;
        options.value = `❌ Rejected promise in ${options.delay}ms`;
    }

    makePromise(options);
    formRef.reset();
    
}


const options = {

}

function makePromise({delay, value, shouldResolve}) {
  return new Promise((resolve, reject) => {
		 setTimeout(() => {
			if(shouldResolve) {
                resolve(
                    iziToast.success({
                        message: value,
                        position: 'topRight',
            })
                
                )
			} else {
                reject(
                    iziToast.error({
                        message: value,
                        position: 'topRight',
                    })
                )
			}
		}, delay);
  });
};