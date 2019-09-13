function Title(props) {
    return React.createElement('h1', {className: 'title', title: props.title}, `${props.title}`)
}

function Paragraph(props) {
    return React.createElement('p', {className: 'paragraph', title: props.paragraph}, `${props.paragraph}`)
}

function Image(props) {
    return React.createElement('img', {className: 'image', alt: 'this-image-has-not-load', src: props.src, width: '300px'})
}

// function MainRender() {

//     function Title() {
//         return React.createElement('h1', {className: 'title'}, "Hello world")
//     }

//     function Paragraph() {
//         return React.createElement('p', {className: 'paragraph'}, "Hello people")
//     }

//     function Image() {
//         return React.createElement('img', {className: 'image', alt: 'aaaa', src: './electron.jpg', width: '300px'})
//     }

//     return[Title(), Paragraph(), Image()]
// }

function Card(props) {
    return React.createElement('div', {className: 'col-sm-12 col-md-4'}, [
        React.createElement(Image, {src: props.url}),
        React.createElement(Title, {title: props.title}),
        React.createElement(Paragraph, {paragraph: props.paragraph})
    ])
};

fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes')
.then(function(response) {
    const respJSON = response.json();
    return respJSON;
})
.then(function(respJSON) {
    const respJSONParsed = respJSON;
    const elementsToBeRendered = [];

    for (let e = 0; e < 5; e++) {
        elementsToBeRendered.push(React.createElement(Card, {url: respJSONParsed._embedded.episodes[e].image.original, title: respJSONParsed._embedded.episodes[e].name, paragraph: respJSONParsed._embedded.episodes[e].summary}));
    }

    ReactDOM.render(
        React.createElement('div', {className: 'container'}, [
            React.createElement('div', {className: 'row'}, elementsToBeRendered)
        ]),
        document.getElementById('root')
    );
})


