
class MovieItem {
    constructor (filmId,nameEn, nameRu, genres, rating, posterUrlPreview, parent,) {
        this.filmId = filmId
        this.genres = genres
        this.nameEn = nameEn
        this.nameRu = nameRu
        this.checkName ()
        this.rating = rating
        this.posterUrlPreview = posterUrlPreview
        this.parent = document.querySelector(parent)
    }

    checkName () {
        this.nameEn = "null" ? this.nameEn = this.nameRu : this.nameEn = this.nameEn
    }

    render () {
          const element = document.createElement('div');
          element.classList.add('md_item');
          element.innerHTML = `
            <div class="md_slider_desc">
                    <div class="md_ganre">
                        ${this.genres}
                    </div>
                    <div class="md_rating">
                        ${this.rating}
                    </div>
                    <div class="md_title">
                        ${this.nameEn}
                    </div>
                </div>
                <img class="md_main_img" src="${this.posterUrlPreview}" alt="">
                <div class="cover">${this.filmId}</div>
          `
          this.parent.appendChild(element)
    }

}

class StuffItem {
    constructor (posterUrl, profession, films, personId, nameEn, nameRu, sex, birthday, parent) {
        this.posterUrl = posterUrl
        this.profession = profession
        this.films = films
        this.sex = sex
        this.personId = personId
        this.nameEn = nameEn
        this.nameRu = nameRu
        this.birthday = birthday
        this.parent = document.querySelector(parent)
    }

    render () {
        const hoverCard = document.createElement('div');
        hoverCard.classList.add('about_stuff');
        hoverCard.innerHTML = `
            <div class="about_stuff">
            <div class="name">
                ${this.nameRu}
            </div>
            <div class="original_name">
                ${this.nameEn}
            </div>
            <div class="title_sl_card">
                О персоне
            </div>
            <div class="proffession">
                Карьера: <span class="info_string">${this.profession}</span>
            </div>
            <div class="birthday">
                ${this.birthday}
            </div>
            <div class="best_films">Топ лучших картин:
                <ul class="best_films_list">
                    <li class="best_films_item">Лига справедливости Зака Снайдера</li>
                    <li class="best_films_item">Лига справедливости Зака Снайдера: Черно-белая версия</li>
                    <li class="best_films_item">Форсаж 5</li>
                    <li class="best_films_item">Форсаж 7</li>
                </ul>
            </div>
        </div>
        `
        this.parent.appendChild(hoverCard);
    }
}

let dataHeader = [
    {ganre :  "Science Fiction", starSrc : "img/star.png", filmTitle : "Godzilla vs. Kong", filmDesc : "In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.", mainImgIsrc : "img/card-img_2.png"},
    {ganre :  "Fantasy", starSrc : "img/star.png", filmTitle : "Wonder Woman 1984", filmDesc : "A botched store robbery places Wonder Woman in a global battle against a powerful and mysterious ancient force that puts her powers in jeopardy.", mainImgIsrc : "img/card-img_3.png"},
    {ganre :  "Fantasy", starSrc : "img/star.png", filmTitle : "Zack Snyder's Justice League", filmDesc : "Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions.", mainImgIsrc : "img/card-img_1.png"},
]

let bodyHeader = [
    {nameRu : "Джон Уик 3", description : "Суперкиллер Джон Уик после нарушения кодекса тайной гильдии ассасинов получает статус изгоя – экскомьюникадо. За его голову назначена цена в 14 миллионов долларов, и армия самых жестоких профессиональных убийц со всего мира открывает на него кровавую охоту.", mainImgIsrc : "images_body_header/Poster.png", },
    {nameRu : "Ведьмак", description : "Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс. В сельской глуши местную девушку Йеннифэр, которой сильно не повезло с внешностью, зато посчастливилось иметь способности к магии, отец продаёт колдунье в ученицы. А малолетняя наследница королевства Цинтра по имени Цири вынуждена пуститься в бега, когда их страну захватывает империя Нильфгаард. Судьбы этих троих окажутся тесно связаны, но скоро сказка сказывается, да не скоро дело делается", mainImgIsrc : "images_body_header/witcher.jpg", },
    {nameRu : "Отряд самоубийц: Миссия навылет", description : "Отобрав наиболее перспективных заключенных из тюрьмы, в которой содержатся не только самые опасные преступники, но и люди со сверхспособностями, и даже не люди, правительственный агент отправляет их на самоубийственное задание в одну латиноамериканскую страну, где недавно произошел военный переворот. А чтобы те наверняка не сбежали, каждому в голову вживляется взрывное устройство.", mainImgIsrc : "images_body_header/Suicide_Squad.jpg", },
    {nameRu : "Игра престолов", description : "К концу подходит время благоденствия, и лето, длившееся почти десятилетие, угасает. Вокруг средоточия власти Семи королевств, Железного трона, зреет заговор, и в это непростое время король решает искать поддержки у друга юности Эддарда Старка. В мире, где все — от короля до наемника — рвутся к власти, плетут интриги и готовы вонзить нож в спину, есть место и благородству, состраданию и любви. Между тем, никто не замечает пробуждение тьмы из легенд далеко на Севере — и лишь Стена защищает живых к югу от нее.", mainImgIsrc : "images_body_header/Game_of_Thrones.jpg", },
    {nameRu : "Затмение", description : "В ходе расследования дела Анджелы Грей детектив Брюс Киннер вынужден обратиться к психологу для выявления ее подавленных воспоминаний. Сеанс регрессивного гипноза открывает ужасающие факты - по ночам с согласия отца над девушкой проводились сатанинские ритуалы. Желая защитить девушку от преследования зловещего тайного общества, детектив оказывается втянут в пугающий мир оккультизма. То, что ему противостоит, находится за гранью понимания и способно бросить вызов его убеждениям и вере.", mainImgIsrc : "images_body_header/Regression.jpg", },
]

