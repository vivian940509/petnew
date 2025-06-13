// doUpdateAdoption.js
import { BASE_URL } from './config.js';

export default function doUpdateAdoption() {
  const data = {
    id:            document.getElementById("id").value,
    applicant_id:  document.getElementById("applicant_id").value,
    pet_id:        document.getElementById("pet_id").value,
    apply_date:    document.getElementById("apply_date").value,
    pickup_date:   document.getElementById("pickup_date").value,
    status:        document.getElementById("status").value,
    reviewed_by:   document.getElementById("reviewed_by").value
  };

  axios.post(
    `${BASE_URL}/index.php?action=updateAdoption`,
    Qs.stringify(data)
  )
  .then(res => {
    const response = res.data;
    document.getElementById("content").innerHTML = response.message;
    setTimeout(() => {
      document.getElementById("adopt").dispatchEvent(new Event("click"));
    }, 1500);
  })
  .catch(err => {
    document.getElementById("content").innerHTML = err;
  });
}
