/**
 * @typedef {Object} Movie
 * @property {string} id
 * @property {string} title
 * @property {string} year
 * @property {string} genre
 * @property {string} director
 * @property {string} synopsis
 * @property {string} posterUrl
 * @property {string} duration
 * @property {string[]} cast
 * @property {number} averageRating
 * @property {number} totalRatings
 */

export const createMovie = ({
    id,
    title,
    year,
    genre,
    director,
    synopsis,
    posterUrl,
    duration,
    cast = [],
    averageRating = 0,
    totalRatings = 0,
}) => ({
    id,
    title,
    year,
    genre,
    director,
    synopsis,
    posterUrl,
    duration,
    cast,
    averageRating,
    totalRatings,
});
