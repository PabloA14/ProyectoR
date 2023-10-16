<template>
    <q-page class="q-pa-md">
        <div>
            <div class="text-h4 text-center q-mb-md">Registro calificado</div> <br>

            <div class="row">


                <div id="card">

                    <q-card class="my-card" flat bordered id="csrd2" >
                        <q-card-section horizontal >
                            <q-card-section class="q-pt-xs" id="section">

                                <div class="text-h5 q-mt-sm q-mb-xs">Gestión contable</div> <br>

                                <div class="text-h6 q-mt-sm q-mb-xs">Titulo que otorga:</div>
                                <div class="text-caption text">
                                    Tecnologo gestión contable
                                </div>

                                <div class="text-h6 q-mt-sm q-mb-xs">Lugar de desarrollo de oferta:</div>
                                <div class="text-caption text">
                                    Nombre del lugar
                                </div>

                                <div class="text-h6 q-mt-sm q-mb-xs">Metodologia:</div>
                                <div class="text-caption text">
                                    Metodilogia
                                </div>

                                <div class="text-h6 q-mt-sm q-mb-xs">Numero de creditos:</div>
                                <div class="text-caption text">
                                    80 creditos
                                </div>

                                <div class="text-h6 q-mt-sm q-mb-xs">Codigo snies:</div>
                                <div class="text-caption text">
                                    48596
                                </div>

                            </q-card-section>

                            <q-card-section class="col-5 flex flex-center">

                                aqui va la fecha

                            </q-card-section>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions>

                            <q-btn style="float: right; margin: 0 auto" color="secondary" icon="download" label="Descargar"
                                class="q-mb-md" />

                            <q-btn flat color="primary">
                                editar
                            </q-btn>
                        </q-card-actions>
                    </q-card>


                </div>
            </div>

        </div>

    </q-page>
</template>
    
<script setup>
</script>

<style scoped>
#card {
    margin: 0 auto;
    width: 40%;
}


#csrd2 {
    border-radius: 4%;
}

#section {
    margin: 2% 5%;
}

.centrada {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.centrada2 {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%)
}
</style>