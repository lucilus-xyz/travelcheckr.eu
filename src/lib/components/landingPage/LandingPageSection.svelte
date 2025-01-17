<script>
    import { exampleGroupedRules } from "$lib/constants/exampleGroupedRules"
    import QueryBox from "$lib/components/queryBox/queryBox.svelte"
    import RuleGroupCard from "$lib/components/rules/RuleGroupCard.svelte"
    import EuropeMap from "./EuropeMap.svelte";
    import Lazy from 'svelte-lazy';
    import BetaRuleWarning from "../BetaWarnings/BetaRuleWarning.svelte";
    import { queryInputDestination, queryResult, queryResultAvailable, queryResultValid } from "$lib/stores/stores";
    import { menuBarHeight } from '$lib/stores/stores'



    // Ability to call request for updated rules 
    let startUpdatedQueryRequestInsideQueryBox;
	function onStartQueryRequest() {
		startUpdatedQueryRequestInsideQueryBox();
	}
</script>


<div class="relative block h-auto">
    <Lazy>
        <EuropeMap />
    </Lazy>

    <div class="grid grid-rows-[50px_auto] md:h-screen relative top-0">
        <div class=""><!-- empty placeholder for top menu bar content --></div>
        <div class="">
            <div 
                id="landing"
                class="

                    md:grid 
                    md:grid-cols-[auto_auto] lg:grid-cols-[auto_auto_auto]

                "
                class:resultView={$queryResultAvailable}
            >
                <div 
                    class="
                        column1
                        md:h-full
                        flex flex-col justify-center items-center p-5
                        pt-16
                    "
                >
                    <h1 class="font-serif font-bold text-4xl leading-normal mb-5">Check travel rules and COVID restrictions</h1>
                    <p class="text-xl leading-normal font-light mb-7">Quickly understand what to <span class="highlighted_underline">do</span>, <span class="highlighted_underline">bring</span>, <span class="highlighted_underline">know</span> and <span class="highlighted_underline">expect</span> about your trip</p>
                    
                    
                    <QueryBox 
                        bind:startQueryRequest={startUpdatedQueryRequestInsideQueryBox}
                    />
                </div>


                {#if $queryResultAvailable === true}
                <div 
                    class="
                        column2 
                        h-full 
                        md:overflow-y-scroll 
                        px-5 py-10 
                        ">
                    {#if !$queryResultValid}
                        <div class="text-left">
                            <p class='mb-4'>It looks like you changed your destination or arrival date. Please check for the updated rules</p>
                            <button on:click={onStartQueryRequest} class="underline underline-offset-2 inline w-auto">Sure, get me those new rules!</button>
                        </div>
                    {:else}
                    
                        <h1 class="font-bold font-serif text-3xl mb-5">What you need to know about your trip to {$queryInputDestination['name']}</h1>
                        
                        <div class="mt-6">
                        {#if $queryResult}
                            {#if $queryResult['a_actions_before_travel']}
                                <RuleGroupCard ruleset={$queryResult['a_actions_before_travel']}/>
                            {/if}

                            {#if $queryResult['b_documents_during_travel']}
                                <RuleGroupCard ruleset={$queryResult['b_documents_during_travel']}/>
                            {/if}

                            {#if $queryResult['c_rules_during_stay']}
                                <RuleGroupCard ruleset={$queryResult['c_rules_during_stay']}/>
                            {/if}

                            {#if $queryResult['d_expect_during_stay']}
                                <RuleGroupCard ruleset={$queryResult['d_expect_during_stay']}/>
                            {/if}
                        {/if}
                        </div>

                        <a class="text-xs underline underline-offset-2 leading-relaxed" href="/rule-feedback">Rules are changing constantly. I'm doing my best to keep up. <br/> Do you know of a rule I missed? Or a rule that is no longer relevant? Let me know!</a>
                    {/if}
                </div>

                <div class="column3"></div>
                {/if}
            </div>
        </div>
    </div>
</div>








<style lang="less">
    ::-webkit-scrollbar {
    display: none;
}
    .highlighted_underline{
        @apply underline underline-offset-2;
    }
    
    @media only screen and (max-width: 767px) {
        
        #landing{
            .column1{
                width: 100vw;
                transition: width 0.5s ease-in-out;
                transition: height 0.5s ease-in-out;
                text-align: center;
                min-height: 100vh;
                margin-top: -50px
            }
            .column2, .column3{
                visibility: visible;
            }
            &.resultView{
                .column1{
                    width: 100%;
                    min-height: 0px;
                    margin-top: 0px;
                }
                .column2{
                    width: 100%;
                    visibility: visible
                }
                .column3{
                    width: 0px;
                    visibility: hidden
                }
    
            }
        }
    }
    
    @media only screen and (min-width: 768px){
        #landing{
            height: calc(100vh - 50px);
        }
    }
    @media only screen and (min-width: 768px) and (max-width: 1023px) {
        #landing{
            .column1{
                width: 100vw;
                transition: width 0.5s ease-in-out;
                text-align: center;
            }
            .column2, .column3{
                visibility: hidden;
            }
            &.resultView{
                .column1{
                    width: 40vw;
                }
                .column2{
                    width: 60vw;
                    visibility: visible
                }
                .column3{
                    width: 0px;
                    visibility: visible
                }
    
            }
        }
    }
    
    @media only screen and (min-width: 1024px) {
        #landing{
            .column1{
                width: 100vw;
                transition: width 0.5s ease-in-out;
                text-align: center;
            }
            &.resultView{
                .column1{
                    width: 25vw;
                }
                .column2{
                    transition: visibility 1s ease-in-out;
                    transition-delay: 0.5s;
                    width: 40vw
                }
                .column3{
                    width: 35vw
                }
            }
        }
    }
 
    
    </style>