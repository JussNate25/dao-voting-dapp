document.addEventListener("DOMContentLoaded", () => {
  const proposals = document.querySelectorAll(".proposal-card");

  proposals.forEach((proposal) => {
    const id = proposal.dataset.id;
    let votes = JSON.parse(localStorage.getItem(`proposal-${id}`)) || { yes: 0, no: 0 };

    const yesBtn = proposal.querySelector(".yes-btn");
    const noBtn = proposal.querySelector(".no-btn");
    const yesText = proposal.querySelector(".results .yes");
    const noText = proposal.querySelector(".results .no");
    const yesBar = proposal.querySelector(".yes-bar");
    const noBar = proposal.querySelector(".no-bar");

    function updateUI() {
      const total = votes.yes + votes.no;
      const yesPercent = total ? Math.round((votes.yes / total) * 100) : 0;
      const noPercent = total ? Math.round((votes.no / total) * 100) : 0;

      yesText.textContent = `Yes: ${yesPercent}%`;
      noText.textContent = `No: ${noPercent}%`;

      yesBar.style.width = `${yesPercent}%`;
      noBar.style.width = `${noPercent}%`;
    }

    yesBtn.addEventListener("click", () => {
      votes.yes++;
      localStorage.setItem(`proposal-${id}`, JSON.stringify(votes));
      updateUI();
    });

    noBtn.addEventListener("click", () => {
      votes.no++;
      localStorage.setItem(`proposal-${id}`, JSON.stringify(votes));
      updateUI();
    });

    updateUI();
  });
});
