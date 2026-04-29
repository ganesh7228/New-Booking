const scriptURL = "https://script.google.com/macros/s/AKfycby_LYe8qx4uO19uGaWojFEHjJGVCLuJ3CgpzQ6LubCPZhLhcAYwNKEIzUTBH1cYyx4/exec;" // 🔴 Replace with your Apps Script Web App URL

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("callbackForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get values
    const name = document.getElementById("name")?.value || "";
    const businessType = document.getElementById("businessType")?.value || "";
    const businessName = document.getElementById("businessName")?.value || "";
    const customBusinessType = document.getElementById("customBusinessType")?.value || "";
    const preferredDate = document.getElementById("date")?.value || "";
    const preferredTime = document.getElementById("time")?.value || "";
    const customRequirement = document.getElementById("customRequirement")?.value || "";

    // Get selected services (multiple)
    const services = Array.from(
      document.querySelectorAll('input[name="services"]:checked')
    )
      .map((el) => el.value)
      .join(", ");

    // Custom service checkbox
    const customService =
      document.getElementById("customService")?.checked ? "Yes" : "No";

    // Final data object
    const data = {
      name: name,
      businessType: businessType,
      businessName: businessName,
      customBusinessType: customBusinessType,
      preferredDate: preferredDate,
      preferredTime: preferredTime,
      services: services,
      customService: customService,
      customRequirement: customRequirement,
    };

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data),
      });

      const result = await response.text();

      alert("✅ Submitted successfully! We will contact you soon.");

      form.reset();
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error submitting form. Please try again.");
    }
  });
});
