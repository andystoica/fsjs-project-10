'use strict';

/**
 * Number of items per page
 */ 
let perPage = 3;



/**
 * Generates an array containing the elements necessary
 * to build a pagination template.
 * 
 * @param {number} pageNum Current page number to be set active
 * @param {number} count Number of results to be paginates
 * @param {string} search Search term to be appended to each link
 */
function pageLinks(pageNum, count, search) {
  
  let pageLinks = [];
  let numPages = Math.ceil(count / perPage);

  for (let i = 1; i <= numPages; i++) {
    let link = '?' + 'page=' + i.toString();
    if (search && search != '') link += '&search=' + search;
    pageLinks.push({ pageNum: i, href: link, active: pageNum == i });
  }

  return pageLinks;
}



module.exports = {
    perPage: perPage,
    pageLinks: pageLinks
}