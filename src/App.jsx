import { useMemo, useState } from "react";
import logoSMA from "../assets/logo.jpg";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const initialData = {
  Name: "",
  Age: "",
  Gender: "",
  Class: "",
  Major: ""
};

const options40 = [
  { value: 0, label: "Sangat Tidak Sesuai" },
  { value: 1, label: "Tidak Sesuai" },
  { value: 2, label: "Sesuai" },
  { value: 3, label: "Sangat Sesuai" }
];

const contextualQuestions = [
    "Saya merasa mampu mengikuti pelajaran di sekolah dengan baik.",
    "Saya sering merasa terbebani oleh tugas-tugas sekolah.",
    "Saya merasa khawatir ketika menghadapi ujian atau penilaian di sekolah.",
    "Saya merasa nilai akademik saya sesuai dengan usaha yang saya lakukan.",
    "Saya kesulitan mengatur waktu antara belajar, mengerjakan tugas, dan kegiatan lainnya.",
    "Saya merasa memiliki tekanan untuk mendapatkan nilai yang tinggi.",
    "Saya merasa nyaman berada di lingkungan sekolah.",
    "Saya merasa mendapatkan dukungan dari guru ketika mengalami kesulitan.",
    "Saya merasa dapat berbicara dengan guru ketika memiliki masalah yang mengganggu pikiran saya.",
    "Saya merasa diterima oleh teman-teman di sekolah.",
    "Saya pernah merasa dikucilkan atau tidak diterima oleh teman-teman.",
    "Saya merasa memiliki teman yang dapat dipercaya untuk bercerita tentang masalah pribadi.",
    "Saya merasa mendapatkan dukungan dari keluarga ketika menghadapi masalah.",
    "Saya merasa nyaman menceritakan masalah pribadi kepada keluarga.",
    "Saya merasa memiliki hubungan yang baik dengan anggota keluarga saya.",
    "Saya sering mengalami konflik dengan anggota keluarga.",
    "Saya merasa mendapatkan tekanan dari keluarga terkait pendidikan atau prestasi akademik.",
    "Saya merasa memiliki hubungan pertemanan yang baik.",
    "Saya merasa memiliki seseorang yang dapat saya percaya ketika sedang menghadapi masalah.",
    "Saya merasa kesepian meskipun berada bersama orang lain.",
    "Saya sering membandingkan diri saya dengan teman-teman saya.",
    "Saya merasa khawatir terhadap penilaian orang lain terhadap diri saya.",
    "Saya merasa kesulitan untuk beradaptasi dengan lingkungan sosial saya.",
    "Saya sering menggunakan media sosial dalam kehidupan sehari-hari.",
    "Saya sering membandingkan kehidupan saya dengan kehidupan orang lain di media sosial.",
    "Saya merasa tidak nyaman ketika tidak dapat mengakses media sosial atau internet.",
    "Penggunaan media sosial sering mengganggu waktu belajar atau tidur saya.",
    "Saya merasa tertekan ketika melihat pencapaian atau kehidupan orang lain di media sosial.",
    "Saya menggunakan media sosial sebagai tempat untuk mencari hiburan ketika sedang mengalami masalah.",
    "Saya mendapatkan waktu tidur yang cukup setiap hari.",
    "Saya sering tidur larut malam karena menggunakan gadget atau mengakses internet.",
    "Saya sering merasa lelah ketika mengikuti kegiatan sekolah.",
    "Saya kesulitan berkonsentrasi ketika belajar karena merasa lelah atau kurang tidur.",
    "Saya memiliki waktu yang cukup untuk beristirahat dan melakukan kegiatan yang saya sukai.",
    "Saya dapat mengendalikan diri ketika menghadapi masalah.",
    "Saya dapat menemukan solusi ketika menghadapi masalah.",
    "Saya cenderung menyimpan masalah sendiri daripada menceritakannya kepada orang lain.",
    "Saya menghindari orang lain ketika sedang menghadapi masalah.",
    "Saya berusaha mencari bantuan ketika merasa tidak mampu menyelesaikan masalah sendiri.",
    "Saya memiliki kegiatan yang membantu saya merasa lebih tenang ketika sedang mengalami tekanan."
];

const dassOptions = [
  { value: 0, label: "Tidak pernah" },
  { value: 1, label: "Kadang-kadang" },
  { value: 2, label: "Sering" },
  { value: 3, label: "Sangat sering / hampir selalu" }
];

const dassQuestions = [
    "Saya merasa sulit untuk tenang setelah mengalami sesuatu yang membuat saya kesal.",
    "Saya menyadari bahwa mulut saya terasa kering.",
    "Saya merasa tidak dapat merasakan perasaan positif sama sekali.",
    "Saya mengalami kesulitan bernapas (misalnya, bernapas terlalu cepat atau sesak napas tanpa melakukan aktivitas fisik).",
    "Saya merasa sulit untuk memulai melakukan sesuatu.",
    "Saya cenderung memberikan reaksi yang berlebihan terhadap suatu situasi.",
    "Saya merasa gemetar (misalnya, pada tangan).",
    "Saya merasa bahwa saya menghabiskan banyak energi karena merasa cemas.",
    "Saya merasa khawatir terhadap situasi yang dapat membuat saya panik atau mempermalukan diri sendiri.",
    "Saya merasa tidak memiliki sesuatu yang dapat diharapkan.",
    "Saya merasa gelisah.",
    "Saya merasa sulit untuk bersantai.",
    "Saya merasa sedih dan tertekan.",
    "Saya merasa tidak sabar terhadap hal-hal yang menghambat saya dalam melakukan sesuatu.",
    "Saya merasa hampir panik.",
    "Saya tidak dapat merasa antusias terhadap suatu hal.",
    "Saya merasa bahwa diri saya tidak berharga sebagai seorang manusia.",
    "Saya merasa mudah tersinggung atau mudah marah.",
    "Saya menyadari adanya perubahan pada detak jantung saya meskipun saya tidak sedang melakukan aktivitas fisik (misalnya, jantung berdebar atau berdetak tidak teratur).",
    "Saya merasa takut tanpa alasan yang jelas.",
    "Saya merasa bahwa hidup saya tidak berarti."
];

const DASS_ITEMS = {
    Depression: [3, 5, 10, 13, 16, 17, 21],
    Anxiety: [2, 4, 7, 9, 15, 19, 20],
    Stress: [1, 6, 8, 11, 12, 14, 18]
};

const DASS_CATEGORIES = {
    Depression: [
        [9, "Normal"],
        [13, "Ringan"],
        [20, "Sedang"],
        [27, "Berat"],
        [Infinity, "Sangat Berat"]
    ],
    Anxiety: [
        [7, "Normal"],
        [9, "Ringan"],
        [14, "Sedang"],
        [19, "Berat"],
        [Infinity, "Sangat Berat"]
    ],
    Stress: [
        [14, "Normal"],
        [18, "Ringan"],
        [25, "Sedang"],
        [33, "Berat"],
        [Infinity, "Sangat Berat"]
    ]
};

function calculateDASS(values) {

    const result = {};

    for (const dimension of Object.keys(DASS_ITEMS)) {

        const rawScore = DASS_ITEMS[dimension].reduce(
            (sum, item) => sum + Number(values[`DASS${item}`] ?? 0),
            0
        );

        const score = rawScore * 2;

        const category =
            DASS_CATEGORIES[dimension]
                .find(([max]) => score <= max)?.[1]
            || "Sangat Berat";

        result[dimension] = {
            score,
            category
        };
    }

    return result;
}

function App() {
  const [step, setStep] = useState("consent");
  const [consent, setConsent] = useState({
    information: false,
    participation: false
  });
  const [respondent, setRespondent] = useState(initialData);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(1);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [summary, setSummary] = useState(null);

  const totalQuestions = 61;
  const questionNumber = current <= 40 ? current : 40 + (current - 40);
  const isDASS = current > 40;
  const actualNumber = isDASS ? current - 40 : current;

  const progress = useMemo(
    () => Math.round((current / totalQuestions) * 100),
    [current]
  );

  const setAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: Number(value) }));
    setError("");
  };

  const startQuestionnaire = () => {
    if (!consent.information || !consent.participation) return;
    setStep("respondent");
    setError("");
  };

  const continueRespondent = () => {
    if (
      !respondent.Name.trim() ||
      !respondent.Age ||
      !respondent.Gender ||
      !respondent.Class.trim() ||
      !respondent.Major.trim()
    ) {
      setError("Mohon lengkapi seluruh data responden.");
      return;
    }

    if (Number(respondent.Age) < 10 || Number(respondent.Age) > 30) {
      setError("Umur harus berada pada rentang yang wajar.");
      return;
    }

    setError("");
    setStep("questionnaire");
    setCurrent(1);
  };

  const next = () => {
    const key = isDASS ? `DASS${actualNumber}` : `K${actualNumber}`;

    if (answers[key] === undefined) {
      setError("Silakan pilih salah satu jawaban terlebih dahulu.");
      return;
    }

    setError("");

    if (current < totalQuestions) {
      setCurrent((v) => v + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const previous = () => {
    setError("");
    if (current > 1) {
      setCurrent((v) => v - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const submit = async () => {
    const missing = [];

    for (let i = 1; i <= 40; i++) {
      if (answers[`K${i}`] === undefined) missing.push(`K${i}`);
    }

    for (let i = 1; i <= 21; i++) {
      if (answers[`DASS${i}`] === undefined) missing.push(`DASS${i}`);
    }

    if (missing.length) {
      setError("Masih ada pertanyaan yang belum dijawab.");
      return;
    }

    const payload = {
      Name: respondent.Name.trim(),
      Age: Number(respondent.Age),
      Gender: respondent.Gender,
      Class: respondent.Class.trim(),
      Major: respondent.Major.trim()
    };

    for (let i = 1; i <= 40; i++) payload[`K${i}`] = answers[`K${i}`];
    for (let i = 1; i <= 21; i++) payload[`DASS${i}`] = answers[`DASS${i}`];
    try {
      setSubmitting(true);
      setError("");
      
      const response = await fetch(`${API_URL}/questionnaire`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Gagal menyimpan kuesioner.");
      }

      setSummary(calculateDASS(answers));
      setStep("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        `${err.message} Pastikan backend aktif dan VITE_API_URL sudah benar.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (step === "success") {
    return (
      <main className="page">
        <section className="card success-card">
          <div className="success-icon">✓</div>
          <h1>Terima kasih!</h1>
          <p>
            Jawaban kuesioner Anda telah berhasil dikirim dan diterima untuk
            keperluan penelitian.
          </p>
          {summary && (
              <div className="summary-section">

                  <h2>Ringkasan DASS-21</h2>

                  <p className="muted">
                      Berikut adalah hasil perhitungan berdasarkan jawaban DASS-21 Anda.
                  </p>

                  <div className="summary-grid">

                      {Object.entries(summary).map(([dimension, result]) => (

                          <div className="summary-card" key={dimension}>

                              <span className="summary-label">
                                  {dimension}
                              </span>

                              <strong className="summary-score">
                                  {result.score}
                              </strong>

                              <span className="summary-category">
                                  {result.category}
                              </span>

                          </div>

                      ))}

                  </div>

                <div className="summary-note">
                    <strong>Catatan:</strong> 
                    Hasil ini merupakan ringkasan skor berdasarkan jawaban Anda
                    dan bukan diagnosis atau penetapan kondisi kesehatan mental.
                    <br/><br/>
                    Jika setelah mengisi kuesioner Anda merasa khawatir, tidak nyaman,
                    atau ingin bercerita mengenai apa yang Anda rasakan, Anda tidak
                    harus menghadapinya sendirian. Anda dapat berbicara dengan orang
                    yang Anda percaya, seperti orang tua, guru, wali kelas, atau
                    orang terdekat.
                </div>

              </div>
          )}
          <p className="muted">
            Anda dapat menutup halaman ini.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="brand">
        <div>
          <strong>Kuesioner Penelitian</strong>
          <span>Pengumpulan Data Penelitian</span>
        </div>
      </div>

      {step === "consent" && (
        <section className="card">

          <div className="eyebrow">
              SURAT PERNYATAAN KESEDIAAN MENJADI RESPONDEN
          </div>

          <h1>
              DAN PERSETUJUAN PENGGUNAAN DATA PENELITIAN
          </h1>

          <div className="consent-content">

              <p>
                  Perkenalkan, saya <strong>Ilman Nawali (NRP 2579003)</strong>,
                  mahasiswa Program Studi Magister Ilmu Komputer, Fakultas
                  Teknologi dan Rekayasa Cerdas, Universitas Kristen Maranatha,
                  Bandung, yang sedang menyusun tesis dengan judul:
              </p>

              <div className="research-title">
                  “Pengembangan dan Evaluasi Komparatif Model Machine Learning
                  untuk Prediksi Risiko Kesehatan Mental pada Siswa SMA X
                  Berbasis Survei DASS-21”
              </div>

              <p>
                  Kuesioner ini disusun untuk keperluan pengumpulan data penelitian,
                  yang bertujuan memahami kondisi kesehatan mental siswa (tingkat
                  depresi, kecemasan, dan stres) menggunakan instrumen DASS-21
                  (Depression Anxiety Stress Scales-21), yang dikombinasikan
                  dengan data kontekstual (demografi, akademik, sosial, gaya
                  hidup, dan lingkungan keluarga).
              </p>

              <p>
                  <strong>
                      Mohon Kesediaan Anda untuk Membaca Hal-Hal Berikut
                      Sebelum Mengisi:
                  </strong>
              </p>

              <ul className="consent-points">
                  <li>
                      Partisipasi dalam pengisian kuesioner ini bersifat
                      <strong> SUKARELA</strong>. Anda berhak menolak atau
                      berhenti mengisi kapan saja tanpa konsekuensi apa pun.
                  </li>

                  <li>
                      Seluruh data dan jawaban yang Anda berikan akan
                      <strong> DIRAHASIAKAN</strong> dan
                      <strong> HANYA digunakan untuk keperluan penelitian
                      akademik</strong> (penyusunan tesis) ini.
                  </li>

                  <li>
                      Identitas responden tidak akan dipublikasikan; data akan
                      disajikan secara agregat/anonim dalam laporan penelitian.
                  </li>

                  <li>
                      Tidak ada jawaban yang benar atau salah. Mohon diisi
                      sejujur-jujurnya sesuai kondisi yang Anda rasakan/alami.
                  </li>

                  <li>
                      Jika Anda merasa tidak nyaman dengan pertanyaan tertentu,
                      Anda berhak untuk tidak menjawabnya.
                  </li>

                  <li>
                      Apabila diperlukan, hasil penelitian ini dapat digunakan
                      sebagai bahan pertimbangan pihak sekolah dalam mendukung
                      program pendampingan siswa, tanpa menyebutkan identitas
                      individu.
                  </li>
              </ul>

              <p>
                  Atas kesediaan dan kerja sama Anda, saya ucapkan terima kasih.
              </p>

              <div className="signature">
                  <p>Hormat saya,</p>

                  <div className="signature-space"></div>

                  <strong>Ilman Nawali</strong>
                  <br/><br/>
                  <span>
                      Peneliti / Mahasiswa Magister Ilmu Komputer
                  </span>
                  <br/><br/>
                  <span>
                      Universitas Kristen Maranatha
                  </span>
              </div>

          </div>

          <div className="consent-divider"></div>

          <div className="consent-list">

              <label className="check-row">
                  <input
                      type="checkbox"
                      checked={consent.information}
                      onChange={(e) =>
                          setConsent((p) => ({
                              ...p,
                              information: e.target.checked
                          }))
                      }
                  />

                  <span>
                      Saya telah membaca dan memahami informasi penelitian
                      di atas.
                  </span>
              </label>

              <label className="check-row">
                  <input
                      type="checkbox"
                      checked={consent.participation}
                      onChange={(e) =>
                          setConsent((p) => ({
                              ...p,
                              participation: e.target.checked
                          }))
                      }
                  />

                  <span>
                      Saya bersedia berpartisipasi secara sukarela dalam
                      penelitian ini dan memberikan data untuk keperluan
                      penelitian.
                  </span>
              </label>

          </div>

          <button
              className="primary-btn"
              disabled={
                  !consent.information ||
                  !consent.participation
              }
              onClick={startQuestionnaire}
          >
              Saya Bersedia, Mulai Kuesioner →
          </button>
        </section>
      )}

      {step === "respondent" && (
        <section className="card">
          <div className="eyebrow">DATA RESPONDEN</div>
          <h1>Informasi Diri</h1>
          <p className="muted">
            Silakan isi data berikut sebelum melanjutkan ke kuesioner.
          </p>

          <div className="form-grid">
            <label>
              Nama
              <input
                value={respondent.Name}
                onChange={(e) =>
                  setRespondent({ ...respondent, Name: e.target.value })
                }
                placeholder="Masukkan nama"
              />
            </label>

            <label>
              Umur
              <input
                type="number"
                min="10"
                max="30"
                value={respondent.Age}
                onChange={(e) =>
                  setRespondent({ ...respondent, Age: e.target.value })
                }
                placeholder="Contoh: 16"
              />
            </label>

            <label>
              Jenis Kelamin
              <select
                value={respondent.Gender}
                onChange={(e) =>
                  setRespondent({ ...respondent, Gender: e.target.value })
                }
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </label>

            <label>
                Kelas

                <input
                    value={respondent.Class}
                    onChange={(e) =>
                        setRespondent({
                            ...respondent,
                            Class: e.target.value
                        })
                    }
                    placeholder="Contoh: X"
                />

                <small className="field-hint">
                    Silakan isi kelas dengan angka Romawi, misalnya X, XI, atau XII.
                </small>
            </label>

            <label className="full">
                Jurusan

                <input
                    value={respondent.Major}
                    onChange={(e) =>
                        setRespondent({
                            ...respondent,
                            Major: e.target.value
                        })
                    }
                    placeholder="Contoh: IPA"
                />

                <small className="field-hint">
                    Jika belum dijuruskan, silakan isi dengan tanda "-".
                </small>
            </label>
          </div>

          {error && <div className="error">{error}</div>}

          <button className="primary-btn" onClick={continueRespondent}>
            Lanjut ke Kuesioner →
          </button>
        </section>
      )}

      {step === "questionnaire" && (
        <section className="card questionnaire-card">
          <div className="progress-header">
            <div>
              <div className="eyebrow">
                {isDASS ? "BAGIAN DASS-21" : "BAGIAN KUESIONER"}
              </div>
              <h1>
                Pertanyaan {actualNumber} dari {isDASS ? 21 : 40}
              </h1>
            </div>
            <strong>{progress}%</strong>
          </div>

          <div className="progress">
            <div style={{ width: `${progress}%` }} />
          </div>

          <p className="instruction">
            {isDASS
              ? "Pilih jawaban yang paling sesuai dengan kondisi Anda."
              : "Pilih jawaban yang paling sesuai dengan pernyataan."}
          </p>

          <div className="question-box">
            <div className="question-number">
              {isDASS ? `DASS${actualNumber}` : `K${actualNumber}`}
            </div>

            <h2>
                {isDASS
                    ? dassQuestions[actualNumber - 1]
                    : contextualQuestions[actualNumber - 1]}
            </h2>

            <div className="options">
              {(isDASS ? dassOptions : options40).map((option) => {
                const key = isDASS
                  ? `DASS${actualNumber}`
                  : `K${actualNumber}`;

                return (
                  <label
                    className={`option ${
                      answers[key] === option.value ? "selected" : ""
                    }`}
                    key={option.value}
                  >
                    <input
                      type="radio"
                      name={key}
                      value={option.value}
                      checked={answers[key] === option.value}
                      onChange={(e) => setAnswer(key, e.target.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {error && <div className="error">{error}</div>}

          <div className="actions">
            <button
              className="secondary-btn"
              onClick={previous}
              disabled={current === 1}
            >
              ← Sebelumnya
            </button>

            {current < totalQuestions ? (
              <button className="primary-btn" onClick={next}>
                Berikutnya →
              </button>
            ) : (
              <button
                className="primary-btn"
                onClick={submit}
                disabled={submitting}
              >
                {submitting ? "Mengirim..." : "Kirim Jawaban ✓"}
              </button>
            )}
          </div>
        </section>
      )}

      <footer>
        Data yang dikirim digunakan untuk kepentingan penelitian.
      </footer>
    </main>
  );
}

export default App;