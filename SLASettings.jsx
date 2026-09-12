import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/sla-settings.css";

function SLASettings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    Urgent: 4,
    High: 12,
    Medium: 24,
    Low: 72
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedSettings =
      JSON.parse(
        localStorage.getItem("slaSettings")
      );

    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);

  function handleChange(priority, value) {
    setSettings({
      ...settings,
      [priority]: value
    });

    setSaved(false);
  }

  function saveSettings() {
    localStorage.setItem(
      "slaSettings",
      JSON.stringify(settings)
    );

    applySLA();

    setSaved(true);
  }

  function applySLA() {
    const complaints =
      JSON.parse(
        localStorage.getItem("complaints")
      ) || [];

    const updatedComplaints =
      complaints.map((complaint) => {

        const slaHours =
          Number(settings[complaint.priority]) || 24;

        return {
          ...complaint,
          slaHours,
          slaStatus:
            complaint.status === "Resolved"
              ? "Completed"
              : "Within SLA"
        };

      });

    localStorage.setItem(
      "complaints",
      JSON.stringify(updatedComplaints)
    );

    window.dispatchEvent(
      new Event("complaintsUpdated")
    );
  }

  return (
    <div className="sla-page">

      {/* HEADER */}

      <header className="sla-header">

        <div
          className="sla-logo"
          onClick={() =>
            navigate("/authority/dashboard")
          }
        >
          RESOLVE<span>360</span>
        </div>

        <button
          onClick={() =>
            navigate("/authority/dashboard")
          }
        >
          ← Admin Dashboard
        </button>

      </header>


      {/* MAIN */}

      <main className="sla-main">

        <section className="sla-title">

          <span>
            SYSTEM CONFIGURATION
          </span>

          <h1>
            SLA <strong>Settings</strong>
          </h1>

          <p>
            Define the maximum response and resolution
            time for each complaint priority.
          </p>

        </section>


        {/* INFORMATION */}

        <div className="sla-info">

          <div className="sla-info-icon">
            ⏱
          </div>

          <div>

            <h3>
              What is SLA?
            </h3>

            <p>
              Service Level Agreement defines the
              maximum time allowed to handle a complaint.
              Higher priority complaints receive shorter
              resolution windows.
            </p>

          </div>

        </div>


        {/* SETTINGS */}

        <section className="sla-settings-card">

          <div className="settings-heading">

            <div>

              <small>
                PRIORITY RULES
              </small>

              <h2>
                Resolution Time Limits
              </h2>

            </div>

          </div>


          {/* URGENT */}

          <div className="sla-row">

            <div className="priority-info">

              <span className="priority-dot urgent"></span>

              <div>

                <h3>
                  Urgent
                </h3>

                <p>
                  Critical issues requiring immediate
                  attention.
                </p>

              </div>

            </div>

            <div className="hours-input">

              <input
                type="number"
                min="1"
                value={settings.Urgent}
                onChange={(e) =>
                  handleChange(
                    "Urgent",
                    e.target.value
                  )
                }
              />

              <span>
                hours
              </span>

            </div>

          </div>


          {/* HIGH */}

          <div className="sla-row">

            <div className="priority-info">

              <span className="priority-dot high"></span>

              <div>

                <h3>
                  High
                </h3>

                <p>
                  Important issues requiring quick
                  action.
                </p>

              </div>

            </div>

            <div className="hours-input">

              <input
                type="number"
                min="1"
                value={settings.High}
                onChange={(e) =>
                  handleChange(
                    "High",
                    e.target.value
                  )
                }
              />

              <span>
                hours
              </span>

            </div>

          </div>


          {/* MEDIUM */}

          <div className="sla-row">

            <div className="priority-info">

              <span className="priority-dot medium"></span>

              <div>

                <h3>
                  Medium
                </h3>

                <p>
                  Standard complaints with normal
                  processing time.
                </p>

              </div>

            </div>

            <div className="hours-input">

              <input
                type="number"
                min="1"
                value={settings.Medium}
                onChange={(e) =>
                  handleChange(
                    "Medium",
                    e.target.value
                  )
                }
              />

              <span>
                hours
              </span>

            </div>

          </div>


          {/* LOW */}

          <div className="sla-row">

            <div className="priority-info">

              <span className="priority-dot low"></span>

              <div>

                <h3>
                  Low
                </h3>

                <p>
                  Non-critical complaints that can be
                  handled later.
                </p>

              </div>

            </div>

            <div className="hours-input">

              <input
                type="number"
                min="1"
                value={settings.Low}
                onChange={(e) =>
                  handleChange(
                    "Low",
                    e.target.value
                  )
                }
              />

              <span>
                hours
              </span>

            </div>

          </div>


          {/* SAVE */}

          <div className="sla-save-area">

            {saved && (
              <span className="saved-message">
                ✓ SLA settings saved
              </span>
            )}

            <button
              onClick={saveSettings}
            >
              Save SLA Settings →
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default SLASettings;