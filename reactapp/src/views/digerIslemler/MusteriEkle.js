import { Button, Container, FormControl, Grid, LinearProgress, TextField ,Select} from '@mui/material';
import React from 'react';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { useState } from 'react';
import validator from 'validator';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';








const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function MusteriEkle() {
    const { id } = useParams();

    const [fetchingError, setFetchingError] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isUpdate, setIsUpdate] = useState(0);
    const [phone, setPhone] = React.useState('');
    const [phoneError, setPhoneError] = React.useState(false);
    const [musteriAdi, setMusteriAdi] = useState('');
    const [musteriSoyadi, setMusteriSoyadi] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [validationErrors, setValidationErrors] = React.useState({});
    const [selectedFirma, setFirmaAdi] = useState('');

    const [firmaId, setFirmaId] = useState(null);

    const firmaListesi = [
        { selectedFirma: 'firma1', label: 'Firma 1' },
        { selectedFirma: 'firma2', label: 'Firma 2' },
    
      ];
    
    
    
      const handleFirmaSelect = (selectedFirma) => {
       setFirmaAdi(selectedFirma);
      };
     
  


      
      
   

    useEffect(() => {
        console.log(id);
        if (typeof id !== 'undefined') {
            setIsUpdate(id);
            setIsFetching(true);
            musteriGetirPromise();
        } else {
            setEmail('');
            setPhone('');
            setMusteriAdi('');
            setMusteriSoyadi('');
            setIsFetching(false);
            setFirmaAdi('');
           
        }
    }, [id]);

    const handleNumber = (value, info) => {
        setPhone(info.numberValue);
        if (matchIsValidTel(value) || info.nationalNumber === '') {
            setPhoneError(false);
        } else {
            setPhoneError(true);
        }
    };

    const handleEmail = (email) => {
        setEmail(email.target.value);
        if (validator.isEmail(email.target.value) || email.target.value === '') {
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    };
  

    const musteriEkle = () => {
        if (typeof id !== 'undefined') {
            toast.promise(musteriEklePromise, {
                pending: 'Müşteri güncelleniyor',
                success: musteriAdi + ' ' + musteriSoyadi + ' başarıyla güncellendi 👌',
                error: musteriAdi + ' ' + musteriSoyadi + ' güncellenirken hata oluştu 🤯'
            });
        } else {
            toast.promise(musteriEklePromise, {
                pending: 'Müşteri kaydı yapılıyor',
                success: musteriAdi + ' ' + musteriSoyadi + ' başarıyla eklendi 👌',
                error: musteriAdi + ' ' + musteriSoyadi + ' eklenirken hata oluştu 🤯'
            });
        }
    };

    const musteriEklePromise = () => {
        return new Promise(async (resolve, reject) => {
            const start = Date.now();
            setValidationErrors({});
            let musteriData = JSON.stringify({
                id: typeof id !== 'undefined' ? id : 0,
                adi: musteriAdi,
                soyadi: musteriSoyadi,
                firmaId: firmaId.value,
                telefonNumarasi: phone,
                email: email
            });

            console.log(musteriData)

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://localhost:7002/api/Musteri/CreateOrUpdate',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'text/plain'
                },
                data: musteriData
            };

            axios
                .request(config)
                .then(async (response) => {
                    console.log(JSON.stringify(response.data));
                    if (response.data.result) {
                        const millis = Date.now() - start;
                        if (millis < 700) {
                            await sleep(700 - millis);
                        }
                        resolve(response.data); // Başarılı sonuç durumunda Promise'ı çöz
                    } else {
                        reject(new Error('İşlem başarısız')); // Başarısız sonuç durumunda Promise'ı reddet
                    }
                })
                .catch((error) => {
                    console.log("test")
                    console.log(error);
                    setValidationErrors(error);
                    reject(error); // Hata durumunda Promise'ı reddet
                });
        });
    };

    const musteriGetirPromise = () => {
        return new Promise(async (resolve, reject) => {
            const start = Date.now();
            setValidationErrors({});
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://localhost:7002/api/Musteri/Get',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'text/plain'
                },
                params: {
                    id: id
                }
            };

            axios
                .request(config)
                .then(async (response) => {
                    console.log(JSON.stringify(response.data));
                    if (response.data.result) {
                        const millis = Date.now() - start;
                        if (millis < 500) {
                            await sleep(500 - millis);
                        }
                        console.log(response.data);
                        setMusteriAdi(response.data.data.adi);
                        setMusteriSoyadi(response.data.data.soyadi);
                        setEmail(response.data.data.email);
                       setFirmaAdi(response.data.data.firmaadi);
                        setPhone(response.data.data.telefonNumarasi);
                        setFetchingError(false);
                        resolve(response.data); // Başarılı sonuç d1urumunda Promise'ı çöz
                    } else {
                        setFetchingError(true);
                        reject(new Error('İşlem başarısız')); // Başarısız sonuç durumunda Promise'ı reddet
                    }
                })
                .catch((error) => {
                    setFetchingError(true);
                    console.log(error);
                    reject(error); // Hata durumunda Promise'ı reddet
                })
                .finally(() => {
                    setIsFetching(false);
                });
        });
    };
   
    return (
        
        <>
            <Container className="d-flex justify-content-center" maxWidth="md">
                <Grid item xs={6}>
                    <FormControl sx={{ m: 0, width: '50ch' }}>
                        {isFetching && <LinearProgress className="mt-3" color="secondary" />}
                        {(isUpdate === 0 || !isFetching) && (
                            <>
                                <TextField
                                    value={musteriAdi}
                                    margin="normal"
                                    id="name"
                                    label="Müşteri Adı"
                                    variant="outlined"
                                    onChange={(e) => setMusteriAdi(e.target.value)}
                                    error={!!validationErrors.Adi} // Hatanın varlığına göre error özelliğini ayarla
                                    helperText={validationErrors.Adi} // Hata mesajını helperText olarak göster*/
                                />
                                <TextField
                                    margin="normal"
                                    value={musteriSoyadi}
                                    id="surname"
                                    label="Müşteri Soyadı"
                                    variant="outlined"
                                    onChange={(e) => setMusteriSoyadi(e.target.value)}
                                    error={!!validationErrors.Soyadi}
                                    helperText={validationErrors.Soyadi}
                                />
                              <Select
                                    margin="normal"
                                    id="company"
                                    label="Firma Adi"
                                    variant="outlined"
                                    error={!!validationErrors.FirmaAdi}
                                    helperText={validationErrors.FirmaAdi}
                                    value={firmaId}
                                    onChange={setFirmaId}
                                    options={firmaListesi}
                                    
                                   
                                    
                                   
                                   
                                />
                                <TextField
                                    error={emailError || !!validationErrors.Email}
                                    helperText={emailError ? 'Email adresini kontrol edin' : validationErrors.Email} // emailError true ise kendi mesajını göster, aksi halde validationErrors'tan gelen mesajı göster
                                    type="email"
                                    margin="normal"
                                    id="e-mail"
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => handleEmail(e)}
                                />
                                <MuiTelInput
                                    error={phoneError || !!validationErrors.TelefonNumarasi}
                                    helperText={phoneError ? 'Telefon numarasını kontrol edin' : validationErrors.TelefonNumarasi}
                                    defaultCountry="TR"
                                    preferredCountries={['TR']}
                                    variant="outlined"
                                    margin="normal"
                                    label="Telefon Numarası"
                                    value={phone}
                                    onChange={(value, info) => handleNumber(value, info)}
                                    id="phone-number"
                                    focusOnSelectCountry
                                    forceCallingCode
                                />
                                <Button onClick={musteriEkle} className="mb-2" margin="normal" variant="contained">
                                    Kaydet
                                </Button>
                            </>
                        )}
                    </FormControl>
                </Grid>
            </Container>
        </>
    );
}

export default MusteriEkle;
