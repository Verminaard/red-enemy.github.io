export default function createRatingView(rating) {
    let ratingView = ""
    let iterator = 0
    for (let i = 0; i < rating; i++) {
        ratingView += `<i class="fa-sharp fa-solid fa-star star-icon" style="color: #ffd500;"></i>`
        iterator++
        if (i + 1 >= rating && i + 1 < 5) {
            if (rating - i > 0) {
                ratingView += `<i class="fa-sharp fa-regular fa-star-half-stroke star-icon" style="color: #ffd500;"></i>`
                iterator++
            }
        }
    }
    for (let i = iterator; i < 5; i++) {
        ratingView += `<i class="fa-sharp fa-regular fa-star star-icon" style="color: #ffd500;"></i>`
    }
    return ratingView
}