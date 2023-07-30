<template>
  <ul class="pagination">
    <template v-for="pageData in displayPageNumbers(currentPage, totalPages)">
      <li class="page-item" :class="{disabled: pageData.active || pageData.page == '...'}">
        <a class="page-link" @click="pageClick(pageData.page)" href="#" v-html="pageData.label"></a>
      </li>
    </template>
  </ul>
</template>
<script setup>
const props = defineProps({
  currentPage: {
    required: true,
    type: Number
  },
  totalPages: {
    required: true,
    type: Number
  }
});

const emit = defineEmits(['pageChanged']);

const pageClick = (pageNumber) => {
  emit('pageChanged', pageNumber);
};

function displayPageNumbers(currentPage, totalPages) {
  const pageRange = 9; // Number of page numbers to display
  const halfRange = Math.floor(pageRange / 2);
  const pagesToDisplay = [];

  if (totalPages <= pageRange) {
    // If the total number of pages is less than or equal to the range, display all page numbers
    pagesToDisplay.push(...Array.from({length: totalPages}, (_, i) => i + 1));
  } else {
    // Calculate the starting page and the ending page to display around the current page
    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, currentPage + halfRange);

    // Adjust the range if we are near the beginning or end of the pagination
    if (endPage - startPage < pageRange - 1) {
      if (currentPage < totalPages / 2) {
        endPage = Math.min(totalPages, startPage + pageRange - 1);
      } else {
        startPage = Math.max(1, endPage - pageRange + 1);
      }
    }
    // Add "prev", two first, two last, and "last" to the page numbers to be displayed
    pagesToDisplay.push(...[
      ...(startPage - 1 >= 1 ? [1] : []),
      ...(startPage > 2 ? [2] : []),
      ...(startPage > 2 ? ["..."] : []),
      ...Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i),
      ...(endPage < totalPages - 1 ? ["..."] : []),
      ...(endPage < totalPages - 1 ? [totalPages - 1] : []),
      ...(endPage + 1 <= totalPages ? [totalPages] : []),
    ]);
  }

  return [
    {
      label: "&laquo; Previous",
      page: currentPage - 1,
      active: currentPage == 1
    },
    ...pagesToDisplay.map((element, index) => { return {label: element, page: element, active: currentPage == element}; }),
    {
      label: "Next &raquo;",
      page: currentPage + 1,
      active: totalPages == currentPage
    }
  ];
}

</script>
