document.addEventListener("DOMContentLoaded", () => {
    const incidentList = document.getElementById("incidentList");
    const filterSeverity = document.getElementById("filterSeverity");
    const sortOrder = document.getElementById("sortOrder");
    const incidentForm = document.getElementById("incidentForm");
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const severityInput = document.getElementById("severity");

    let incidents = [
        { id: 1, title: "Biased Recommendation Algorithm", description: "Algorithm consistently favored certain demographics.", severity: "Medium", reportedAt: "2025-03-15T10:00:00Z" },
        { id: 2, title: "LLM Hallucination in Critical Info", description: "LLM provided incorrect safety procedure information.", severity: "High", reportedAt: "2025-04-01T14:30:00Z" },
        { id: 3, title: "Minor Data Leak via Chatbot", description: "Chatbot inadvertently exposed non-sensitive user metadata.", severity: "Low", reportedAt: "2025-03-20T09:15:00Z" }
    ];

    function renderIncidents() {
        incidentList.innerHTML = "";
        let filteredIncidents = [...incidents];


        const selectedSeverity = filterSeverity.value;
        if (selectedSeverity !== "All") {
            filteredIncidents = filteredIncidents.filter(incident => incident.severity === selectedSeverity);
        }


        filteredIncidents.sort((a, b) => {
            return sortOrder.value === "newest"
                ? new Date(b.reportedAt) - new Date(a.reportedAt)
                : new Date(a.reportedAt) - new Date(b.reportedAt);
        });


        filteredIncidents.forEach(incident => {
            const li = document.createElement("li");
            li.className = `incident ${incident.severity.toLowerCase()}`;
            li.innerHTML = `
                <strong>${incident.title}</strong> (${incident.severity}) <br>
                <small>${new Date(incident.reportedAt).toLocaleString()}</small>
                <button class="toggleDetails">View Details</button>
                <p class="details" style="display: none;">${incident.description}</p>
            `;
            const btn = li.querySelector(".toggleDetails");
            btn.addEventListener("click", () => {
                const details = li.querySelector(".details");
                details.style.display = details.style.display === "none" ? "block" : "none";
            });
            incidentList.appendChild(li);
        });
    }


    incidentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!titleInput.value.trim() || !descriptionInput.value.trim()) {
            alert("All fields are required!");
            return;
        }
        const newIncident = {
            id: incidents.length + 1,
            title: titleInput.value,
            description: descriptionInput.value,
            severity: severityInput.value,
            reportedAt: new Date().toISOString()
        };
        incidents.push(newIncident);
        titleInput.value = "";
        descriptionInput.value = "";
        renderIncidents();
    });


    filterSeverity.addEventListener("change", renderIncidents);
    sortOrder.addEventListener("change", renderIncidents);


    renderIncidents();
});
