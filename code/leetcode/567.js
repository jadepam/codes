/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 * 思路：需考虑重复的情况
 * 1、最优解：字符串只为小写字母，故计算S1、S2字符串中每个小写字母的个数，如果一致则返回true
 * 2、方法二：截取S2中所有长度等于S1长度的字符串并存储为数组s2Containslits，用some()方法判断s2Containslits中是含有所有字符都包含在S1中的字符串，如果有则返回true
 */
//方法一

const checkInclusion = (s1, s2) => {
    let letters = Array(26).fill(0), sub = Array(26).fill(0);//26为字母
    
    for (let i = 0; i < s1.length; i++) {
        let code = s1.charCodeAt(i) - 97;//a的编码从97开始
        letters[code]++;
    }
    
    for (let i = 0; i < s2.length; i++) {
        if (i >= s1.length) { sub[s2.charCodeAt(i - s1.length) - 97]--; }
        sub[s2.charCodeAt(i) - 97]++;
        
        if (i >= s1.length - 1 && letters.every((v, i) => v === sub[i])) {
            return true;
        }
    }
    console.log("end checkInclusion")
    return false;
};
//方法二
const checkInclusion2 =(s1, s2)=> {
    let s1arr=s1.split(''),s2arr=s2.split(''),s2Containslits=[]
    for (let i=0;i<=s2arr.length-s1arr.length;i++){
        s2Containslits.push(s2.substr(i,s1arr.length))
    }
    let Inclusion=s2Containslits.some(r=>{
        let arr=[],str =s1.split('')
        for (let i of r){
            let index =str.indexOf(i)
            if(index!==-1){
                str.splice(index,1)//防止重复
                arr.push(i)
            }
        }
        return arr.length===r.length
    })
    console.log("end checkInclusion2")
    return Inclusion
};
let s1="voujinkwlkydjrmbehskvlulpwmdczrzefahwvyakbzjvawxzhqztqswqghubeqhzyuyufiwxqxtyefgxteihyprxbwdykssxadcybtcverkzifjlheqwnpfeckywhusbmqktjhjjsodaqzdsghhaysoilhlqfbgobbwztiouplfeborkkqpqrrcizyazsttjjyaonwsqcbmmafafsvqofypdxcxsjqufxpxokkqftvneezbpidaqdwiprzztzlhdnyxjzpfplrwksetmdjsoskolwammzedrgwbttgjiznopuuwbqqwlyhrpzrapujnyufljiuwjaanikjsfaohejygudydnlaiczmokjqzkxxdsaexxlddypwgfopyruqvfvawqhxvwwmkiekvkkmojunjzxwiqkigohuwtlqhotzrbhpbvxpczmsqjlhmwbfyzlhlpjeawcxkracgjqmcdmtbzvssvgnuhwroxgoihlgbaxmmakzxxsyvscycylsbaaemmsrifqfcssdhzguueblxomruathvmybhgenytgddikaaogkwssdibperbodtlerrnkrdqicgnzwfxaoeqmfovjfetzrvpcsgpeeytxpbtefkwjgmuydmebhxwafemwlncgkwayljyatmmanmpfakwdnmvjqppuknagllcoyixpykxmvykfrfrwmiitxwvzwgiikzwhyhekgsyqivdizzpemotanlmtofjlcilwntqwwumgamtwszhfwcicqeqbxlpaotqfrgbehfcooooreeztiznxevlnkhqhtoeabvuzaxyslvtvelysgashucyvocysscbacshieepypttkkgbyebsrlbyrbsdadnunzzkwbyzspxucoblwmkmtnsatssazxwivfzwifiecrwofdbcaazxdofglusktgrjivedhokzdvdhtreingnglymhujlxrakfesmtemxildrpxazibxxndxctkpvupwisazhbkitwmbejzhzvafhtaisvjjvzyivmdghrmduheifbvwwjypbcxflesxswzybfaauzklcmjfzvcwulzemnaozqvprubrdzotggqkbwfjbsiyacsqyrnqdthyhemowcbxdapfuoohskvnyjehjzvyrzgkjeenfxurfalblwaklfevbgeiniihdcgaskpaqkxakrxwtklffhfvgoetfxuvpjtstdhcuithgsgdtqwuqbwjdjxctttmfrhkliyaylsdvwzyrtwenotyfourzhkqidkzmoqfbpwnodcyjnsbksbqymnvuvudsqwfnykavdpnyszbwofjxdjfhihztefusfvjcrgmoehigqsqhhkfcaumjgxzjhinydrbgapdrnzxcljdjzlwfliwhbcvoajviehzpdvxvigvaxtlctrtsctcaizxghlukazxjahjpmhwbcdcqdmvdadsluekbwwhzxrqwopdcecvpryeljmwzjotlapnunnpslbkehezwztlcauadepikdljsunxisiajtiqtdazgtizxmnilfrvhmyojdddxzsuzfychpysdsicakzctydwuwfkehxnfijhnwvwxaundogctgqcuuqpbetoqhwvgrqslrlvtlqvzuqmllvcpuikqrqfivfcfjvfohzfmvkyqbcahaarcyacidsfdobrbgclxkuijwdaaxpdtjbzudxegdijfecmmobkqeioogpthtdpvuzjqciiyfikvgzbpozxpksgnfgmrfqqcufjuangtaayzrqnhhgcxrjgroqltxwzammhoxfcykalbsutmwptspfcriqbhsxhjjhqyayquztgpsjvxbctfzskvqnsaiprqqtfzlelkgthqfpbwyjxiddryedqejhjrmzadkzdcpcekvuyyvhwqgadsgrdvukdypufnotfutbnnvfntzqgglgbfxtbhzczzfhcyvfidpcpchysdbzoeodexitmbuksjbyffpxgvpwfpqkeccxpjweokjpxvtsutezxyqpbsxekeacpxqbuhjcbrmprgisuuxoxehopkhmaqojxvodzblpiegmjtrhbijhvrogimhdfzoxpnofyujwqqzarheceiiirmuflxhcfjxqmadisviqjfzkmccnydksegmnwfdxxbngudcwthnbhockycjnzolwpxfkljmffqjoljsqcorbciunavkgfubnjamqspijnoabmyjlrtkefaiceufpffvwnygcxwrthyqerjedqyvpwtezyrvojztrxcxqqywebiqxcmnzuavbnpdyigtsyeojvubqhvetoocfifxqqczmnhmbxcxoxfdmjopbalqrivjkcayonnolylghzkajbxnxzwmnfsszryatbdhlhmoobxkxrwiwuezhujdpvqhohuevcmmjufkbzqriivpxvgvvjyvaipoewijpptjgpzsetuywcnfljssallxikayhjrjyedrlyboracgykaooieezeeubbrzsvuovdprsjifpihmuwwrgjhufsdwwbhhrloolxencdaiwhwrmsaqyamuwmicdzoisnydtfnzwrwpbpwbxzmmtxtxufolxchlealeslcyiweakaoysvijfzmninpmbzeazbjvdyojoyalopdmpdstsymgksuacwsppdmnkiluwoqylyedzzsyhgpxfwyaldfabbstonesihlypcouswkfcywnrggzzkamrtedxyzivuystgiuospvywhqqezjcbnhwzvsoqsbcvccsdhakxcbffrimyiuobwszvccwcdmzknqkicshubettbrvutlhhheuqyjblhvrbabwresreuuzwaeqgaflvcbjmzbenfoekgigcgxawvgnhofkoibvapouamuywgxhivfcchfqiecpltnnebwhgenmnujcrotnrzzrntsrceqaubpcqggoqkzvqnyigbwotnxgehpvcioyevbfqbqodkjsxrkoseytzhhzdymdftgsssibzroetdvhlxsfvqnqwhtyeldmjqdpctdzxkgqkcfmsxanilktehbwcwtaixi"
let s2="oqupbcqazvlehlzjyamwlmpybilihvokonzhgqiyomtdxcfcjrvyvzbftvxhcntsavnfumzzozxwpzllomceexaxmablfcluylwwgxzzcrfbusucsdaqlfztvxbwyaygucnowcvvwukhghyzbbwmgvdtcqdvwgulezccmcdmkkftwzodzpnmxxkgmlclgitebyjmferxpnerphcvpvrypnyhvnazizzrmqlpjgkoucmyqdzbwpewgduarfrulybyrokbztghpxojkxespppqpqgnnxacqtzebeogoswbwitciuvqdrlpohhfsgsjhbtgxlegvkovpzdjabojfojubbuabdagjppdtuaevynopbeawkyfevuutdczkxwkkvuiabnkgnscyquirognkzkeeelfmjyljljiozzswkkcxqsajbitjscsnrdzpiuaatkvbfhufaowbdmtydklapdbwlxvxfmoagutecttrbdogxhlrzxbtqqnyzludvwenlrbqehfjkgkcbtnknxcpexgyrkjvfdygoyfzjlceirvhlqrxjgrqxwezwhgnhkrisazhwhzhqdywuorxgmnhbippzuvbarblpbnwznvwnwhmxotwxeadpdcpjelkxopwmizuqctxhoxxrdyaxbvzhrcdtsaaxzehxroqupdigxzdrpbkztvxpnjbnscxvcqxkgfaocyhjqkyxwyogbeoekjepufascoyohlbebqypwvfgvwynfwcpoazzowvbvawvrxovsebibgcuiegpclatcxfiydvpxbolcmwlmwsvryaicjdirggfqykoezcrvzcgcnppdswmxjizjxgvxsitnwbhpfhpvcnliaofdfpwiwylrlaawqljqzpgymhhoygtieqnmujcacvxgzawjvofxsohkmoahshwmgwdarcgbginnrtfekniliwkqxbobcwusprjgasjbppiofeexhgiuxcbhysqpmacufvzjcpbxpdldbvtwpszpwaabqbrhwuczdluybcaelvuhurjwoblkoclsnqpjosgivwiynczedalhpksdibfvuhzcolormvxsbeokfvsbogoubdtzrupvehtdqmewxddjmlnsikxfxudmjqcqhsxlfcxqmgzafpszejwunccnrqmlnuumlxemmrvluioeaqspsvfrbyjjcmlvchjhcvyqzoeqobjeinxdzzwiyinmirkzqndcpmmjpejujfgtcftmccsoarfxvjtdczpvfbgluqvpynqtqmsfpngqeyiimseuldmnjnnwtpuwyggdlybuvpoxfyayhovxzhtlbmsldorjckmywsmigdocgbpbysjrpnxpzafxvbzciasldrtbjsiygspavhalsdvecanlmcmihcmyebtciayyvugavrpcvnjernmaqxusslswgrqauuerjbswsppvsbyffltivkoqkacscyryboknnhbstpmffhvnbznevcmolwvsusmowvybevlyksceaokcnymmgfmmetsacabcsinnqltrxsdnqfseaziyvbecfbacwqimrdgrdwpxrsusmwnervyedswloinjzxfphuvtkvujknlizsxgqoiotniuflvufiftskingufhgvqewvjqbhpyuhgzidoloeibxzwagkpffzotyprkmzajvuahrevwuanmzrqiaoedmdiaghxuslncxunbudftxwipuzihldhcjndwtzqirbwjpqqpckxaweteotuoqtxjsrfzdbwriihvbtnlbtttlnvivfyhetdlvrkqvjqscclmaifqqrgkcegwpzffhfywfaireqazvtkqinfnkzzdhdxdjjnpzyqowacsjhmfrnowekxhnoesupsnatiivxtjphzdonrbvbyrlljyjwyjqkndvskaffacxzcwyfgnpgbrxyqpnwjwvixnjvjykagehbsyxwjvvtlhhxjtqejinhiuejjvnbomyolslaacwcnasyavbcvpiqjldhqenlsmesoauvwekeooaqtlfgtyfgettakefpeknxwmgpxpkkmksfdvrgofgnwgsgadnjwmaltbguxgkajsukrujbrgzpdqxgehheqgniwxvlzdpnmvffxtoiznttsspvrufkkpfhlyenaotplkkfwvojtjnyzitnhnebwthecknkpeevctgtxbbbmmrxdzyeuatgctejpnuljsuoosqhdtpmcbhpmzzbdvhphvurbvurfjbtcoxenxprlodvqgyyooougpnyqqcsauflkbzyatregubqyeemntuilwfbcozptqwszgaueuomxhhrotdqeelblnbmwmhfdbqvtalgfwcxlruqjuxjepurpqkwuxnlajjrfnugtexgdiyxocfeqrmlrrfggbxywbrrmhrablneshhdpxpggkmzfnwdcrkrybzwxngplkvftxjgxfgiuuomvusihtndwmfxialvoujinkwlkydjrmbehskvlulppmdczrzefahwvyakbzjvawxzhqztqswqghubeqhzyuyufiwxmxtyefgxteihyprxbwdykssxadcybtcverkzifjlheqwnpfeckywhusbmqktjhjjsodaqzdsghhaysoilhlqfbgobbwztiouplfeborkkqpqrrcizyazsnmjjyaonwsqcbmmafafsvqofypdxcxsjqufxpxokkqftvneezbpidaqdwiprzztzlhdnyxjzpfplrwksetmdjsoskolwammzedrgwbttgjiznopuuwbqqwlyhrpzrapujnyufljiuwjaanikjsfaohejygudydnlaiczmokjqzkxxdsaexxlddypwgfopyauqvfvawqhxvwwmkiekvkkmojunjzxwiqkigohuwtlqhotzrbhpbvxpczmsqjlhmwbfyzlhlpjeawcxkracgjqmcdmtbzvssvgnuhwroxgoihlgbaxmmakzxxsyvscycylsbaaemmsrifqfcssdhzguueblxomruathvmybhgenytgddikaaogkwssdibperbodtberrnkrdqicgnzwfxaoaqmfovjfetzrvpcsgpeeytxpbtefkwjgmuydmebhxwafemwlncgkwayljaatmmanmpfekwdtmvjqppuknagllcoyixpykxmvykfrfrwmiitxwvzwgiikzwhyhekgsyqivdizzwemotanlmtofjlcilwntqwwumgamtwszhfwcicqeqbxlpaotqfrgbehfcooooteeztiznxevlnkhqhtoerbvuzaxyslvtvelysgashucyvocysscbacshieepypttkkgbyebsrlbyrbsdadnunzzkwbyzspxecoblwmkmtnsatssazxwivfzwifiucrwofdbcaazxdofglusktgrjivedhokzdvdhtreingnglymhujlxrakfesmtetxildrpxazibxxndxctkpvuzwisazhbkitwmbejzhzvafhtaisvjjvzyivmdghrmduheifbvwwjypbcxflesxswzybfayuzklcmjfzvcwuazemnaozqvprubrdzotggqkbwfjbsiyacsqyrnqdthyhemowcbxdapfuoohskvnyjehjzvyrzskjeenfxurfalblwaklfevbgeiniihdcgaskpaqkxakrxwtklffhfvgoetfxuvpjrstdhcuithgsgdtqwuqbwjdjxctttmfrhkliyaylsdowzyrtwenotyfourzhkqidkzmoqfbpwnodcyjnsbksbqymnvuvudsqwfnykavdpnyszbwofjxdjfhihztefusfvjcrgmoehigqsqhhkfcauqjgxzjhinydrbgapdrnzxcljdjzlwfliwhbcvosjviehzpdvxvigvaxtlctrtsctcaizxghlukazxjahjpmhwbcdcqdmvdadsluekbwwhzxrqwopdcecvpryeljmwzjotlapnunnpslbkehepwztlcauadepikdljsunxisiajtiqtdazgtizxmnilfrvhmyojdddxzsuzfychpysdsiczkzctydwuwfkehxnfijhnwvwxaundogctgqcuuqpbewoqhwvgrqslrlvtlqvzuqmllvcpuikqrqdivfcfjvfohzfmvkyqbcahaarcyacidsfdobrbgclxkuijwdaaxpdtjbzudxegdijfecmmobbqeioogpthtdpvuzjqciiyfikvgzbpozxpksgnfgmrfqqcufjulngtaayzrqnhhgcxrjgroqltxwzammhoxfcykalbsutmwptspfcriqbhsxhjjhqyayquztgpsjvxbctfzskvqnsaiprqqtfzlelkgthqfpbwyjxiddryedqejhjrmzadkzdcpcekvuyyvhwqgadsgmdvukdypufnotfutlnnvfntzqzglgbfxtbhzczzfhcyvfidpcpchzsdbzoeodexitmbuksjbyffpxgvptfpqkeccxpjweokjpxvtsutezxyqpbsxekeacpxqbuhjcbrmprgisuuxoxehopkhmaqojxvodzblpiegmjtrhbijhvrogimhdfzoxpnofyujwqqzarheceiiirmuflxhcfjxqmadisviqjfzkmccnydksegmnwfdxxbngudcwthnbhockycjnzolwpxfkljmffqjoljsqcorbciunavkgfubnjamqspijnoabmyjlrtkefaiceufpffvwnygcxwrthyqerjedqyvpwtezyrvvjztrxcxqqywebiqbcmnzuavbnpdyigtsyeojvubqhvetoocfifxqqczmnhmbxcxoxfdmjopxalqrivjkcayonnolylghzkajbxnxzwmnfsszryatbdhlhmoobxkxrwiwuezhujdpvqhohuevcmmjufkbzqriivpxvgvvjyvaipoewijpptjgpzsetuywcnfljssallxikayhjrjyedrlyboracgykaooieegeeubbrzsvuovdprsjifpihmuwwrgjhufsdwwbhhrloolxencdaiwhwrmsaqyamuwmicdzoignydtfnzwrwpbpwbxzmmtxtxufolxchlealeslcyiweakaoysvijfzmninpmbzeazbjvdyojoyalopdmpdstsymgksuacwsppdmnkiluwoqylyedzzsyhgpxfwyaldfabbstonesihlypcouswkfcywnrggzzkamrtedxyzivuystgiuospvywhqqezjcbnhwyvsoqsbcvccadhakxcbffrimyiuobwszvccwcdmzknqkicshubettbrvutlhhheuqyjblhvrbabwresreuuzwaeqgaflvcbjmzbenfoekgigcgxawvgnhofkoikvapouamuywgxhivfcchfqiecpltnnebwhgenrnujcrotnrzzrntsrceqaubpcqggoqkzvqnyigbwotnxgehpvcioyevbfqbqodkjsxrkoseytzhhzdymfftgsssibaroetdvhlxsfvqnqwhtyeldmjqdpctdzxkgqkcfmsxanilktehbwcwtaixiefnhewlzmfeefpldmeptjjshxebbwrbmhrmybddxovkszadbyeqvrxncffozgozdrro"

checkInclusion(s1,s2)
// checkInclusion2(s1,s2)