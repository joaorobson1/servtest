class FormSubmit {
    constructor(settings) {
        this.sethings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);
        if (this.form) {
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }
    displaySucess() {
        this.form.innerHTML = this.sethings.sucess;
    }
    displayError() {
        this.form.innerHTML = this.sethings.error;
    }

    getFormObject() {
        const getFormObject = {};
        const fields = this.form.querySelectorAll("[name");
        fields.forEach((field) => {
            getFormObject[field.getAttribute("name")] = field.value;
        });
        return getFormObject;
    }

    onSubmission(event) {
        event.preventDefault();
        event.target.disabled = true;
        event.target.innerText = "Enviando...";
    }

    async sendForm(event) {
        try {
            this.onSubmission(event);
            await fetch(this.url, {
                method: "POST",
                headers: {
                    "Contet-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displaySucess();
        } catch (error) {
            this.displayError();
            throw new Error(error);
        }
    }

    init() {
        if (this.form)
            this.formButton.addEventListener("click", this.sendForm);
        return this;
    }
}
const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    sucess: "<h1 class='sucess'> Mensagem enviada! </h1>",
    error: "<h1 class= 'error'> Não foi possível enviar sua mensagem </h1>"
});
form.Submit.init();
