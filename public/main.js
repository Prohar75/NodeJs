const update = document.querySelector('#update-button');

update.addEventListener('click', _ => {
    fetch('/api/notes',{
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: FocusEvent.stringify({
            name: 'Egor',
            quote: 'quote',
        }),
    });
});