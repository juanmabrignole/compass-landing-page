// place files you want to import through the `$lib` alias in this folder.


export async function reCaptcha() {
    return new Promise((res, rej) => {
        setTimeout(rej, 10000)

        //@ts-ignore
        grecaptcha.ready(function () {
            //@ts-ignore
            grecaptcha.execute('6LcE9jsqAAAAAOyzMhfoTOA-G0kI6kCxadXeFwME', {action: 'submit'}).then(function(token) {
                res(token)
            });
        });      
    }) as Promise<string>
}