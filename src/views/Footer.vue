<template>
    <div>
      <br>
        <footer class="footer">
          <cookie-law theme="base" message="Dev-crown peut utiliser des cookies pour mémoriser vos informations de connexion, collecter des statistiques en vue d’optimiser la fonctionnalité du site"
                      buttonText="accepter les cookies"	buttonClass="button is-primary">
          </cookie-law>
            <div class="content">
                <div class="row">
                    <div class="col-md-4">
                        <div class="title is-4">Dev-crown.com</div>
                        <p class="text">
                            Après avoir découvert le développement web en 2017, et en avoir fait ma passion depuis,
                            j’étais désireux de partager celle ci au plus grand nombre, grâce à ce site. Alors bienvenue !
                        </p>
                    </div>
                    <div class="col-md-4">
                        <div class="title is-4">Mes réseaux sociaux</div>
                        <ul>
                            <li>
                              <a href="https://twitter.com/devcrown_" target="_blank">
                                Twitter <i class="fab fa-twitter-square"></i>
                              </a>
                            </li>
                            <li>
                              <a href="https://www.youtube.com/channel/UCLqmLGwCCTfY2Cb-i5SU1rw" target="_blank">
                                Chaine Youtube <i class="fab fa-youtube"></i>
                              </a>
                            </li>
                            <li>
                              <a href="https://github.com/crownbackend" target="_blank">
                                Github <i class="fab fa-github-square"></i>
                              </a>
                            </li>
                            <li>
                              <a href="https://www.twitch.tv/devcrown/" target="_blank">
                                Twitch <i class="fab fa-twitch"></i>
                              </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <div class="title is-4">A propos</div>
                        <ul>
                            <li>
                              <router-link :to="{name: 'politique'}">
                                Politique de confidentialité
                              </router-link>
                            </li>
                            <li>
                              <router-link :to="{name: 'contact'}">
                                Me contacter
                              </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import CookieLaw from 'vue-cookie-law'
export default {
  components: { CookieLaw }
}
</script>

<style scoped>
    .footer {
        background-color: #D2D2D2;
    }
</style>