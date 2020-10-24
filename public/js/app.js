console.log('Client side js script is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    message1.textContent='Loading data'
    message2.textContent=''

    fetch('/weather?search=' + encodeURIComponent(location)).then((response)=>{
        response.json().then((data)=>{
            message1.textContent=''
            if (data.error) {
                console.log(data.error)
                message1.textContent=data.error
            }else{
                message2.textContent=data.location + ', ' + data.forecastdata.temperature + ', ' + data.forecastdata.windspeed + ', ' + data.forecastdata.description
            }
            
        })
    })
})