# Google Sheets RSVP Integration

Target Sheet: [Mustafa & Tasneem RSVP Responses](https://docs.google.com/spreadsheets/d/1tygrKTnyoGsdj4KtKI4ogeCblV7MA8zkt8AwEICrxrM/edit?usp=sharing)

## Quick 2-Minute Deployment

1. Open your sheet: [https://docs.google.com/spreadsheets/d/1tygrKTnyoGsdj4KtKI4ogeCblV7MA8zkt8AwEICrxrM/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1tygrKTnyoGsdj4KtKI4ogeCblV7MA8zkt8AwEICrxrM/edit?usp=sharing)
2. In Google Sheets top menu, click: **Extensions** > **Apps Script**
3. Paste the contents of `Code.gs` into the editor and click **Save** (💾)
4. Select `setupSheet` from the function dropdown and click **Run** (this will format your headers with royal purple and gold)
5. Click **Deploy** > **New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the resulting **Web App URL** and paste it into `app.js` under `GOOGLE_SHEET_WEBHOOK_URL`.
