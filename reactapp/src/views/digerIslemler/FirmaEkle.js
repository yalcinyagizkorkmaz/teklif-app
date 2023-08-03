import { Button, Container, FormControl, Grid, LinearProgress, TextField } from '@mui/material';
import React from 'react';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { useState } from 'react';
import validator from 'validator';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';







const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function FirmaEkle() {
    const { id } = useParams();

    const [fetchingError, setFetchingError] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isUpdate, setIsUpdate] = useState(0);
    const [firmaPhone, setFirmaPhone] = React.useState('');
    const [firmaPhoneError, setFirmaPhoneError] = React.useState(false);
    const [firmaAdi, setFirmaAdi] = useState('');
    const [firmaEmail,setFirmaEmaill] = useState('');
    const [firmaEmailError, setFirmaEmailError] = useState(false);
    const [firmaValidationErrors, setFirmaValidationErrors] = React.useState({});
    const [firmaFaaliyetAlani,setFirmaFaaliyetAlani]= useState('');
    const[firmaMerkezi,setFirmaMerkezi]=useState('');
    
    
   

    useEffect(() => {
        console.log(id);
        if (typeof id !== 'undefined') {
            setIsUpdate(id);
            setIsFetching(true);
            firmaGetirPromise();
        } else {
            setFirmaAdi('');
            setIsFetching(false);
            setFirmaEmaill('');
            setFirmaPhone('');
            setFirmaFaaliyetAlani('');
            setFirmaMerkezi('');
        }
    }, [id]);
   
      

    const handleNumber = (value, info) => {
        setFirmaPhone(info.numberValue);
        if (matchIsValidTel(value) || info.nationalNumber === '') {
            setFirmaPhoneError(false);
        } else {
            setFirmaPhoneError(true);
        }
    };

    const handleEmail = (firmaEmail) => {
        setFirmaEmaill(firmaEmail.target.value);
        if (validator.isEmail(firmaEmail.target.value) || firmaEmail.target.value === '') {
            setFirmaEmailError(false);
        } else {
            setFirmaEmailError(true);
        }
    };

    const firmaEkle = () => {
        if (typeof id !== 'undefined') {
            toast.promise(firmaEklePromise, {
                pending: 'Firma güncelleniyor',
                success: firmaAdi + 'Firma başarıyla güncellendi 👌',
                error: firmaAdi +'Firma güncellenirken hata oluştu 🤯'
            });
        } else {
            
            toast.promise(firmaEklePromise, {
                pending: 'Firma kaydı yapılıyor',
                success: firmaAdi +'Firma başarıyla eklendi 👌',
                error: firmaAdi +'Firma eklenirken hata oluştu 🤯'
            });
        }
        
    };

    const firmaEklePromise = () => {
        return new Promise(async (resolve, reject) => {
            const start = Date.now();
         

            setFirmaValidationErrors({});
            let firmaData = JSON.stringify({
                id: typeof id !== 'undefined' ? id : 0,
                firmaAdi: firmaAdi,
                firmaFaaliyetAlani:firmaFaaliyetAlani,
                firmaMerkezi:firmaMerkezi,
                firmaTelefonNumarasi: firmaPhone,
                firmaEmail: firmaEmail
               
            });

            console.log(firmaData);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://localhost:7002/api/Firma/CreateOrUpdate',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'text/plain'
                },
                data: firmaData
                
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
                    console.log(error);
                    setFirmaValidationErrors(error);
                    reject(error); // Hata durumunda Promise'ı reddet
                });
        });
    };

    const firmaGetirPromise = () => {
        return new Promise(async (resolve, reject) => {
            const start = Date.now();
            setFirmaValidationErrors({});
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://localhost:7002/api/Firma/Get',
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
                        setFirmaAdi(response.data.data.firmaAdi);
                        setFirmaFaaliyetAlani(response.data.data.firmaFaaliyetAlani);
                        setFirmaMerkezi(response.data.firmaMerkezi);
                        setFirmaEmaill(response.data.data.firmaEmail);
                        setFirmaPhone(response.data.data.firmaTelefonNumarasi);
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
                                    margin="normal"
                                    id="firmaName"
                                    value={firmaAdi}
                                    label="Firma Adı"
                                    variant="outlined"
                                    onChange={(e) => setFirmaAdi(e.target.value)}
                                    error={!!firmaValidationErrors.Adi} // Hatanın varlığına göre error özelliğini ayarla
                                    helperText={firmaValidationErrors.Adi} // Hata mesajını helperText olarak göster  
                                />
                                 <TextField
                                    margin="normal"
                                    id="firmaFaaliyetAlani"
                                    value={firmaFaaliyetAlani}
                                    label="Firma Faaliyet Alani"
                                    variant="outlined"
                                    onChange={(e) => setFirmaFaaliyetAlani(e.target.value)}
                                    error={!!firmaValidationErrors.Adi} // Hatanın varlığına göre error özelliğini ayarla
                                    helperText={firmaValidationErrors.Adi} // Hata mesajını helperText olarak göster  
                                />

                                 <TextField
                                    margin="normal"
                                    id="firmaMerkezi"
                                    value={firmaMerkezi}
                                    label="Firma Merkezi"
                                    variant="outlined"
                                    onChange={(e) => setFirmaMerkezi(e.target.value)}
                                    error={!!firmaValidationErrors.Adi} // Hatanın varlığına göre error özelliğini ayarla
                                    helperText={firmaValidationErrors.Adi} // Hata mesajını helperText olarak göster  
                                />

                                <TextField
                                    error={firmaEmailError|| !!firmaValidationErrors.Email}
                                    helperText={firmaEmailError ? 'Firma Email adresini kontrol edin' : firmaValidationErrors.firmaEmail} // emailError true ise kendi mesajını göster, aksi halde validationErrors'tan gelen mesajı göster
                                    type="email"
                                    margin="normal"
                                    id="firma-e-mail"
                                    label="Firma Email"
                                    variant="outlined"
                                    value={firmaEmail}
                                    onChange={(e) => handleEmail(e)}
                                />
                                <MuiTelInput
                                    error={firmaPhoneError || !!firmaValidationErrors.firmaTelefonNumarasi}
                                    helperText={firmaPhoneError ? 'Telefon numarasını kontrol edin' : firmaValidationErrors.firmaTelefonNumarasi}
                                    defaultCountry="TR"
                                    preferredCountries={['TR']}
                                    variant="outlined"
                                    margin="normal"
                                    label="Firma Telefon Numarası"
                                    value={firmaPhone}
                                    onChange={(value, info) => handleNumber(value, info)}
                                    id="firma-phone-number"
                                    focusOnSelectCountry
                                    forceCallingCode
                                />
                                <Button onClick={firmaEkle} className="mb-2" margin="normal" variant="contained">
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

export default FirmaEkle;


