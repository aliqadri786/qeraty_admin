<template>
  <div id="main">
    <div class="row">
      <div class="col-sm-3">
        <b-form-group label-for="size" label="Select Period">
          <v-select
            id="size"
            name="size"
            v-model="period"
            :options="days"
            placeholder="Select Period"
            @input="updateDates"
          ></v-select>
        </b-form-group>
      </div>
      <div class="col-sm-3">
        <b-form-group id="start-Group" label="Start Date" label-for="start">
          <b-form-input id="start" v-model="dates.start_date" name="start" type="date"></b-form-input>
        </b-form-group>
      </div>
      <div class="col-sm-3">
        <b-form-group id="end-Group" label="End Date" label-for="end">
          <b-form-input id="end" v-model="dates.end_date" name="end" type="date"></b-form-input>
        </b-form-group>
      </div>
      <div class="col-sm-2">
        <button
          id="btn"
          class="btn btn-outline-danger"
          @click="handleFilter"
          style="margin-top:33px;height:34px;"
          :disabled="searching"
        >
          <span v-if="searching">
            <b-spinner small type="grow"></b-spinner>Searching...
          </span>
          <span v-else>Search</span>
        </button>
        <!-- <button
          id="btn"
          class="btn btn-outline-danger"
          @click="handleFilter"
          style="margin-top:33px;height:34px;"
        >Apply</button>-->
      </div>
      <div
        class="col-sm-1"
        :style="searching?'margin-left:-40px':'margin-left:-100px'"
        v-if="resetButton"
      >
        <button
          id="btn"
          class="btn btn-outline-secondary"
          @click="handleReset"
          style="margin-top:33px;height:34px;"
        >Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String
    },
    resetButton: {
      type: Boolean
    }
  },
  data() {
    return {
      period: "Today",
      filterData: [],
      searching: false,
      dates: {
        start_date: this.currentDate(),
        end_date: this.currentDate()
      },
      days: [
        "Today",
        "Yesterday",
        "This Week",
        "Last Week",
        "This Month",
        "Last Month",
        "This Year",
        "Last Year"
      ]
    };
  },
  methods: {
    handleFilter() {
      this.getFilteredData();
    },
    handleReset() {
      this.$emit("resetData");
    },
    getFilteredData() {
      this.searching = true;

      this.$store
        .dispatch(this.link, this.dates)
        .then(data => {
          this.$emit("FilteredData", data);
          this.searching = false;
        })
        .catch(error => {
          this.$error(error.response.data);
        });
    },
    daysInMonth(month, year) {
      var days = new Date(year, month, 0).getDate() + 1;
      return days;
    },
    currentDate() {
      return new Date().toISOString().slice(0, 10);
    },
    updateDates() {
      if (this.period == "Today") {
        this.dates = {
          start_date: this.currentDate(),
          end_date: this.currentDate()
        };
      } else if (this.period == "Yesterday") {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        date = date.toISOString().slice(0, 10);

        this.dates = {
          start_date: date,
          end_date: date
        };
      } else if (this.period == "This Week") {
        var current = new Date(); // get current date
        var weekstart = current.getDate() - current.getDay() + 1;
        // var weekend = weekstart + 6; // end day is the first day + 6
        var monday = new Date(current.setDate(weekstart));
        monday = monday.toISOString().slice(0, 10);
        var today = this.currentDate();

        this.dates = {
          start_date: monday,
          end_date: today
        };
      } else if (this.period == "Last Week") {
        var current1 = new Date(); // get current date
        var weekstart1 = current1.getDate() - current1.getDay();
        var weekend1 = weekstart1 - 6; // end day is the first day + 6
        var first = new Date(current1.setDate(weekend1));
        var last = new Date(current1.setDate(weekstart1));
        first = first.toISOString().slice(0, 10);
        last = last.toISOString().slice(0, 10);

        this.dates = {
          start_date: first,
          end_date: last
        };
      } else if (this.period == "This Month") {
        this.dates = {
          start_date: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            2
          )
            .toISOString()
            .slice(0, 10),
          end_date: this.currentDate()
        };
      } else if (this.period == "Last Month") {
        this.dates = {
          start_date: new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 1,
            2
          )
            .toISOString()
            .slice(0, 10),
          end_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            .toISOString()
            .slice(0, 10)
        };
      } else if (this.period == "This Year") {
        var month = (new Date().getMonth(), 0);
        var year = new Date(new Date().getFullYear(), month);

        year = year.toISOString().slice(0, 10);

        this.dates = {
          start_date: year,
          end_date: this.currentDate()
        };
      } else {
        this.dates = {
          start_date: new Date(
            new Date().getFullYear() - 1,
            (new Date().getMonth(), 0)
          )
            .toISOString()
            .slice(0, 10),
          end_date: new Date(
            new Date().getFullYear(),
            (new Date().getMonth(), 0)
          )
            .toISOString()
            .slice(0, 10)
        };
      }
      this.$emit("updatedDates", this.dates);
    }
  }
};
</script>

<style>
</style>