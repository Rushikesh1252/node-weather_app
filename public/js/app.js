
const weatherform= document.querySelector('form')
const search = document.querySelector('input')

const messg1 = document.querySelector('#mess1')
const messg2 = document.querySelector('#mess2')

messg1.textContent = 'Loading....'
messg2.textContent = ''

weatherform.addEventListener('submit',(e)=>{

    e.preventDefault()

    let location = search.value

    fetch("/weather?address="+location).then((response)=>{

    response.json().then((data)=>{

        if(data.error)
        {
            messg1.textContent = data.error
           
            console.log(data.error)
        }
        else
        {
            messg1.textContent = data.Forecast
            messg2.textContent = data.location
            console.log(data.Forecast);
            console.log(data.location)
        }
    })

})
})
